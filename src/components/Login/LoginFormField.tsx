import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
};

export function LoginFormField({
  label,
  value,
  onChange,
  type = 'text',
}: Props) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder="Input text"
      fullWidth
      size="small"
      sx={{
        '& .MuiInputBase-root': { bgcolor: '#fff' },
      }}
    />
  );
}
