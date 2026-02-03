import { TextField } from '@mui/material';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
