import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = { onClick?: () => void };

export function DeleteCourseButton({ onClick }: Props) {
  return (
    <IconButton
      aria-label="delete course"
      onClick={onClick}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
}
