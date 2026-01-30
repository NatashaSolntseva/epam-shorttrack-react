import { Typography } from '@mui/material';
import { formatDate } from '../../ulils';

type Props = { creationDate: string };

export function CreationDate({ creationDate }: Props) {
  return (
    <Typography variant="body2">
      <b>Created:</b> {formatDate(creationDate)}
    </Typography>
  );
}
