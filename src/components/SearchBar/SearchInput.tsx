import { TextField } from '@mui/material';

export function SearchInput() {
  return (
    <TextField
      placeholder="Input text"
      size="small"
      sx={{
        width: { xs: 220, sm: 360, md: 520 },
        bgcolor: '#fff',
        borderRadius: 1,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
      }}
    />
  );
}
