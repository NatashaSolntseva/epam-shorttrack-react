import { Typography } from '@mui/material';

type Props = { id: string };

export function Id({ id }: Props) {
  return (
    <Typography variant="body2" sx={{ mb: 1 }}>
      <b>ID:</b> {id}
    </Typography>
  );
}
