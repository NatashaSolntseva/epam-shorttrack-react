import { Typography } from '@mui/material';

type Props = { authors: string[] };

export function AuthorsList({ authors }: Props) {
  return (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
      <b>Authors:</b> {authors.join(', ')}
    </Typography>
  );
}
