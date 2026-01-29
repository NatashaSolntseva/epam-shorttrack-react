import { Box } from '@mui/material';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

export function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <SearchInput />
      <SearchButton />
    </Box>
  );
}
