import { Typography } from '@mui/material';

type Props = { name: string };

export function UserName({ name }: Props) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {name}
    </Typography>
  );
}
