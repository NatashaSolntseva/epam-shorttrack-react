import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
//import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';
// import {
//   mockedCoursesList,
//   mockedAuthorsList,
// } from './__mocks__/coursesList.ts';
// import { CoursesList } from './components/CoursesList/CoursesList.tsx';
//import { CourseInfo } from './components/CourseInfo/CourseInfo.tsx';
import { EmptyCoursesList } from './components/EmptyCoursesList/EmptyCoursesList.tsx';

function App() {
  // const authorsById = Object.fromEntries(
  //   mockedAuthorsList.map((a) => [a.id, a.name] as const)
  // );

  // const selectedCourse = {
  //   ...mockedCoursesList[0],
  //   authors: mockedCoursesList[0].authors.map(
  //     (id) => authorsById[id] ?? 'Unknown author'
  //   ),
  // };

  //const handleBack = () => console.log('back');
  const handleAdd = () => console.log('add new course');
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ bgcolor: '#e9e9e9', minHeight: '100vh', py: 3 }}
      >
        {/* <Container maxWidth="lg">
          <CoursesToolbar />
        </Container> */}
        {/* <CoursesList courses={mockedCoursesList} authors={mockedAuthorsList} /> */}
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          {/* <CourseInfo course={selectedCourse} onBack={handleBack} /> */}
          <EmptyCoursesList onAdd={handleAdd} />
        </Container>
      </Box>
    </>
  );
}

export default App;
