import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';
import {
  mockedCoursesList,
  mockedAuthorsList,
} from './__mocks__/coursesList.ts';
import { CoursesList } from './components/CoursesList/CoursesList.tsx';
import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { EmptyCoursesList } from './components/EmptyCoursesList/EmptyCoursesList.tsx';
import { useMemo, useState } from 'react';
import type { Course, View } from './types/types.ts';
import {
  deleteCourse,
  ensureCoursesInitialized,
  resetCoursesToMocks,
} from './services/coursesStorage.ts';
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

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(() => Boolean(getToken()));
  const [userName, setUserName] = useState<string>(() => {
    const user = getUser();
    return user ? `${user.firstName} ${user.lastName}`.trim() : '';
  });
  const [authError, setAuthError] = useState('');

  const [courses, setCourses] = useState<Course[]>(() =>
    ensureCoursesInitialized(mockedCoursesList)
  );

  const [view, setView] = useState<View>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  const resetCoursesFlowState = () => {
    setView('list');
    setSelectedCourseId(null);
    setSearchInput('');
    setAppliedQuery('');
  };

  const handleAdd = () => {
    const next = resetCoursesToMocks(mockedCoursesList);
    setCourses(next);
    resetCoursesFlowState();
  };

  const handleDelete = (id: string) => {
    const next = deleteCourse(id);
    setCourses(next);

    if (next.length === 0) {
      setSearchInput('');
      setAppliedQuery('');
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
      mockedAuthorsList.map((author) => [author.id, author.name] as const)
    );

    return {
      ...selectedCourseRaw,
      authors: selectedCourseRaw.authors.map(
        (id) => authorsById[id] ?? 'Unknown author'
      ),
    };
  }, [selectedCourseRaw]);

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
                {courses.length === 0 ? (
                  <EmptyCoursesList onAdd={handleAdd} />
                ) : (
                  <>
                    <CoursesToolbar
                      searchValue={searchInput}
                      onSearchValueChange={setSearchInput}
                      onSearch={handleSearch}
                      onReset={handleReset}
                    />

                    {filteredCourses.length === 0 && appliedQuery.trim() ? (
                      <NoCoursesFound query={appliedQuery.trim()} />
                    ) : (
                      <CoursesList
                        courses={filteredCourses}
                        authors={mockedAuthorsList}
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
    </>
  );
}

export default App;
