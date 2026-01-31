import { Box, Typography } from '@mui/material';

type Props = {
  query?: string;
};

export function NoCoursesFound({ query }: Props) {
  return (
    <Box
      sx={{
        mt: 3,
        p: 5,
        bgcolor: '#fff',
        borderRadius: 1.5,
        boxShadow: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        No courses found
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
        {query ? (
          <>
            We couldn&apos;t find anything for <b>{query}</b>.
          </>
        ) : (
          <>Try a different search query.</>
        )}
      </Typography>
    </Box>
  );
}
