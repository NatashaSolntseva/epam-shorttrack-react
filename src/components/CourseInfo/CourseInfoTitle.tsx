import { Typography } from '@mui/material';

type Props = { title: string };

export function CourseInfoTitle({ title }: Props) {
  return (
    <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
      {title}
    </Typography>
  );
}
