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

function App() {
  const [courses, setCourses] = useState<Course[]>(() =>
    ensureCoursesInitialized(mockedCoursesList)
  );

  const [view, setView] = useState<View>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleAdd = () => {
    const next = resetCoursesToMocks(mockedCoursesList);
    setCourses(next);
    setView('list');
    setSelectedCourseId(null);
  };

  const handleDelete = (id: string) => {
    const next = deleteCourse(id);
    setCourses(next);
  };

  const handleShow = (id: string) => {
    setSelectedCourseId(id);
    setView('info');
  };

  const handleBack = () => {
    setView('list');
    setSelectedCourseId(null);
  };

  const selectedCourseRaw = useMemo(() => {
    if (!selectedCourseId) return null;
    return courses.find((c) => c.id === selectedCourseId) ?? null;
  }, [courses, selectedCourseId]);

  const selectedCourse = useMemo(() => {
    if (!selectedCourseRaw) return null;

    const authorsById = Object.fromEntries(
      mockedAuthorsList.map((a) => [a.id, a.name] as const)
    );

    return {
      ...selectedCourseRaw,
      authors: selectedCourseRaw.authors.map(
        (id) => authorsById[id] ?? 'Unknown author'
      ),
    };
  }, [selectedCourseRaw]);

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ bgcolor: '#e9e9e9', minHeight: '100vh', py: 3 }}
      >
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          {view === 'list' && (
            <>
              {courses.length === 0 ? (
                <EmptyCoursesList onAdd={handleAdd} />
              ) : (
                <>
                  <CoursesToolbar />
                  <CoursesList
                    courses={courses}
                    authors={mockedAuthorsList}
                    onDelete={handleDelete}
                    onShow={handleShow}
                  />
                </>
              )}
            </>
          )}

          {view === 'info' && selectedCourse && (
            <CourseInfo course={selectedCourse} onBack={handleBack} />
          )}

          {view === 'info' && !selectedCourse && <div>Course not found</div>}
        </Container>
      </Box>
    </>
  );
}

export default App;
