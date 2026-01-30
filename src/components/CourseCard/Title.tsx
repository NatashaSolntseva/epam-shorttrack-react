import { Typography } from '@mui/material';

type Props = { title: string };

export function Title({ title }: Props) {
  return (
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      {title}
    </Typography>
  );
}
