import { Typography } from '@mui/material';
import { formatDuration } from '../../ulils';

type Props = { duration: number };

export function Duration({ duration }: Props) {
  return (
    <Typography variant="body2" sx={{ mb: 1 }}>
      <b>Duration:</b> {formatDuration(duration)}
    </Typography>
  );
}
