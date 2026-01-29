import { Box, Container } from '@mui/material';
import { Header } from './components/Header/Header';
import { CoursesToolbar } from './components/CoursesToolbar/CoursesToolbar';

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
      </Box>
    </>
  );
}

export default App;
