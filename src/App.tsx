import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';
import {
  mockedCoursesList,
  mockedAuthorsList,
} from './__mocks__/coursesList.ts';
import { CoursesList } from './components/CoursesList/CoursesList.tsx';

function App() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ bgcolor: '#e9e9e9', minHeight: '100vh', py: 3 }}
      >
        <Container maxWidth="lg">
          <CoursesToolbar />
        </Container>
        <CoursesList courses={mockedCoursesList} authors={mockedAuthorsList} />
      </Box>
    </>
  );
}

export default App;
