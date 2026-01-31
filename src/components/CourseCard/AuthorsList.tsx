import { Typography, Box } from '@mui/material';

type Props = { authors: string[] };

export function AuthorsList({ authors }: Props) {
  return (
    <Box
      sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline', minWidth: 0 }}
    >
      <Typography variant="body2" sx={{ flexShrink: 0, mb: 0.5 }}>
        <b>Authors:</b>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 0.5,
          minWidth: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={authors.join(', ')}
      >
        {authors.join(', ')}
      </Typography>
    </Box>
  );
}
