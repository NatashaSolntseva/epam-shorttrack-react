import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';
import { CoursesList } from './components/CoursesList/CoursesList.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { EmptyCoursesList } from './components/EmptyCoursesList/EmptyCoursesList.tsx';
import { useEffect, useMemo, useState } from 'react';
import type { Author, Course, View } from './types/types.ts';
import { NoCoursesFound } from './components/NoCoursesFound/NoCoursesFound.tsx';
import {
  AuthError,
  clearToken,
  clearUser,
  getToken,
  getUser,
  login,
} from './services/authService.ts';
import { Login } from './components/Login/Login.tsx';
import { CourseFormModal } from './components/CourseFormModal/CourseFormModal.tsx';
import {
  deleteCourseById,
  fetchAuthors,
  fetchCourses,
  type CreateCoursePayload,
  createCourse,
} from './services/coursesApi.ts';
import { Loader } from './components/Loader/Loader.tsx';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(() => Boolean(getToken()));
  const [userName, setUserName] = useState<string>(() => {
    const user = getUser();
    return user ? `${user.firstName} ${user.lastName}`.trim() : '';
  });
  const [authError, setAuthError] = useState('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [view, setView] = useState<View>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  const openCourseForm = () => setIsCourseFormOpen(true);
  const closeCourseForm = () => setIsCourseFormOpen(false);

  const resetCoursesFlowState = () => {
    setView('list');
    setSelectedCourseId(null);
    setSearchInput('');
    setAppliedQuery('');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourseById(id);

      setCourses((prev) => {
        const next = prev.filter((course) => course.id !== id);

        if (next.length === 0) {
          setSearchInput('');
          setAppliedQuery('');
        }

        return next;
      });
    } catch (e) {
      console.error('[API] delete error:', e);
    }
  };

  const handleShow = (id: string) => {
    setSelectedCourseId(id);
    setView('info');
  };

  const handleBack = () => {
    setView('list');
    setSelectedCourseId(null);

    setSearchInput('');
    setAppliedQuery('');
  };

  const handleSearch = () => {
    setAppliedQuery(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput('');
    setAppliedQuery('');
  };

  const filteredCourses = useMemo(() => {
    const query = appliedQuery.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) => {
      const title = course.title.toLowerCase();
      const desc = course.description.toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  }, [courses, appliedQuery]);

  const selectedCourseRaw = useMemo(() => {
    if (!selectedCourseId) return null;
    return courses.find((course) => course.id === selectedCourseId) ?? null;
  }, [courses, selectedCourseId]);

  const selectedCourse = useMemo(() => {
    if (!selectedCourseRaw) return null;

    const authorsById = Object.fromEntries(
      authors.map((author) => [author.id, author.name] as const)
    );

    return {
      ...selectedCourseRaw,
      authors: selectedCourseRaw.authors.map(
        (id) => authorsById[id] ?? 'Unknown author'
      ),
    };
  }, [selectedCourseRaw, authors]);

  const handleAuthButtonClick = () => {
    if (isAuth) {
      clearToken();
      clearUser();

      setIsAuth(false);
      setUserName('');

      resetCoursesFlowState();
    }
  };

  const handleLogin = async (username: string, password: string) => {
    setAuthError('');

    try {
      await login({ username, password });

      setIsAuth(true);

      const user = getUser();
      setUserName(user ? `${user.firstName} ${user.lastName}`.trim() : '');

      resetCoursesFlowState();
    } catch (e) {
      setIsAuth(false);

      if (e instanceof AuthError) {
        const msg = e.message.toLowerCase();

        if (msg.includes('invalid credentials')) {
          setAuthError('Invalid username or password');
        } else {
          setAuthError(e.message || 'Something went wrong');
        }

        return;
      }

      setAuthError('Something went wrong');
    }
  };

  useEffect(() => {
    Promise.all([fetchAuthors(), fetchCourses()])
      .then(([authors, courses]) => {
        setCourses(courses);
        setAuthors(authors);
      })
      .catch((e) => console.error('[API] load error:', e))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <Header
        isAuthenticated={isAuth}
        userName={userName}
        onAuthButtonClick={handleAuthButtonClick}
      />

      <Box
        component="main"
        sx={{ bgcolor: '#e9e9e9', minHeight: '100vh', py: 3 }}
      >
        {!isAuth ? (
          <Login
            onLogin={handleLogin}
            serverError={authError}
            onServerErrorClear={() => setAuthError('')}
          />
        ) : (
          <Container maxWidth="lg" sx={{ mt: 3 }}>
            {view === 'list' && (
              <>
                {!isLoaded ? (
                  <Loader />
                ) : courses.length === 0 ? (
                  <EmptyCoursesList onAdd={openCourseForm} />
                ) : (
                  <>
                    <CoursesToolbar
                      searchValue={searchInput}
                      onSearchValueChange={setSearchInput}
                      onSearch={handleSearch}
                      onReset={handleReset}
                      onAddCourse={openCourseForm}
                    />

                    {filteredCourses.length === 0 && appliedQuery.trim() ? (
                      <NoCoursesFound query={appliedQuery.trim()} />
                    ) : (
                      <CoursesList
                        courses={filteredCourses}
                        authors={authors}
                        onDelete={handleDelete}
                        onShow={handleShow}
                      />
                    )}
                  </>
                )}
              </>
            )}

            {view === 'info' && selectedCourse && (
              <CourseInfo course={selectedCourse} onBack={handleBack} />
            )}

            {view === 'info' && !selectedCourse && <div>Course not found</div>}
          </Container>
        )}
      </Box>
      <CourseFormModal
        open={isCourseFormOpen}
        mode="create"
        onClose={closeCourseForm}
        authors={authors}
        onSubmit={async (payload: CreateCoursePayload) => {
          const created = await createCourse(payload);
          setCourses((prev) => [created, ...prev]);
          closeCourseForm();
        }}
        onAuthorsChange={setAuthors}
      />
    </>
  );
}

export default App;
