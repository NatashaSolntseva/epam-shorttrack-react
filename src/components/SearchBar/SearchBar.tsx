import { Box } from '@mui/material';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';
import { ResetButton } from './ResetButton';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

export function SearchBar({ value, onChange, onSearch, onReset }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <SearchInput value={value} onChange={onChange} />
      <SearchButton onClick={onSearch} />
      <ResetButton onClick={onReset} disabled={!value} />
    </Box>
  );
}
