import { Box } from '@mui/material';
import { SearchBar } from '../SearchBar/SearchBar';
import { AddNewCourseButton } from '../AddNewCourseButton/AddNewCourseButton';

export function CoursesToolbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,

        '@media (max-width:750px)': {
          flexDirection: 'column',
          alignItems: 'stretch',
        },
      }}
    >
      <SearchBar />
      <AddNewCourseButton />
    </Box>
  );
}
