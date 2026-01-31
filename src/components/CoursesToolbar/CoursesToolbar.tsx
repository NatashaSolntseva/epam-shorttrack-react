import { Box } from '@mui/material';
import { SearchBar } from '../SearchBar/SearchBar';
import { AddNewCourseButton } from '../AddNewCourseButton/AddNewCourseButton';

type Props = {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

export function CoursesToolbar({
  searchValue,
  onSearchValueChange,
  onSearch,
  onReset,
}: Props) {
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
      <SearchBar
        value={searchValue}
        onChange={onSearchValueChange}
        onSearch={onSearch}
        onReset={onReset}
      />
      <AddNewCourseButton />
    </Box>
  );
}
