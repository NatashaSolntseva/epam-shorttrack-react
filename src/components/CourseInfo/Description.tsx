import { Typography, Box } from '@mui/material';

type Props = { description: string };

export function Description({ description }: Props) {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Description:
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', lineHeight: 1.7 }}
      >
        {description}
      </Typography>
    </Box>
  );
}
