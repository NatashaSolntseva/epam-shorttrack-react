import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = { onClick?: () => void };

export function EditCourseButton({ onClick }: Props) {
  return (
    <IconButton
      aria-label="edit course"
      onClick={onClick}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
    >
      <EditIcon />
    </IconButton>
  );
}
