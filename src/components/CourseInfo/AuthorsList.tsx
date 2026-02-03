import { Typography } from '@mui/material';

type Props = { authors: string[] };

export function AuthorsList({ authors }: Props) {
  return (
    <Typography variant="body2">
      <b>Authors:</b> {authors.join(', ')}
    </Typography>
  );
}
