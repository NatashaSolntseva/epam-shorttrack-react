import { useEffect, useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';
import { CoursesList } from './components/CoursesList/CoursesList.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { EmptyCoursesList } from './components/EmptyCoursesList/EmptyCoursesList.tsx';
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
  createCourse,
  updateCourse,
  type CreateCoursePayload,
  type UpdateCoursePayload,
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

  const [courseFormMode, setCourseFormMode] = useState<'create' | 'edit'>(
    'create'
  );
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const openCreateCourseForm = () => {
    setCourseFormMode('create');
    setEditingCourseId(null);
    setIsCourseFormOpen(true);
  };

  const openEditCourseForm = (id: string) => {
    setCourseFormMode('edit');
    setEditingCourseId(id);
    setIsCourseFormOpen(true);
  };

  const closeCourseForm = () => setIsCourseFormOpen(false);

  const editingCourse = useMemo(() => {
    if (!editingCourseId) return null;
    return courses.find((course) => course.id === editingCourseId) ?? null;
  }, [courses, editingCourseId]);

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

  const handleCourseFormSubmit = async (
    payload: CreateCoursePayload | UpdateCoursePayload,
    id?: string
  ) => {
    if (courseFormMode === 'edit') {
      if (!id) return;

      const updated = await updateCourse(id, payload as UpdateCoursePayload);

      setCourses((prev) =>
        prev.map((course) => (course.id === id ? updated : course))
      );
      closeCourseForm();
      return;
    }

    const created = await createCourse(payload as CreateCoursePayload);

    setCourses((prev) => [created, ...prev]);
    closeCourseForm();
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
                  <EmptyCoursesList onAdd={openCreateCourseForm} />
                ) : (
                  <>
                    <CoursesToolbar
                      searchValue={searchInput}
                      onSearchValueChange={setSearchInput}
                      onSearch={handleSearch}
                      onReset={handleReset}
                      onAddCourse={openCreateCourseForm}
                    />

                    {filteredCourses.length === 0 && appliedQuery.trim() ? (
                      <NoCoursesFound query={appliedQuery.trim()} />
                    ) : (
                      <CoursesList
                        courses={filteredCourses}
                        authors={authors}
                        onDelete={handleDelete}
                        onShow={handleShow}
                        onEdit={openEditCourseForm}
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
        mode={courseFormMode}
        onClose={closeCourseForm}
        authors={authors}
        initialCourse={editingCourse}
        onSubmit={handleCourseFormSubmit}
        onAuthorsChange={setAuthors}
      />
    </>
  );
}

export default App;
