import { Typography } from '@mui/material';

type Props = { description: string };

export function Description({ description }: Props) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {description}
    </Typography>
  );
}
