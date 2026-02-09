import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: React.HTMLInputTypeAttribute;
  error?: boolean;
  helperText?: string;
};

export function LoginFormField({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  error = false,
  helperText = '',
}: Props) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      type={type}
      placeholder="Input text"
      error={error}
      helperText={helperText}
      fullWidth
      size="small"
      sx={{
        '& .MuiInputBase-root': { bgcolor: '#fff' },
      }}
    />
  );
}
