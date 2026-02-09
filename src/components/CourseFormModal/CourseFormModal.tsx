import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CourseForm } from '../CourseForm/CourseForm';

type Props = {
  open: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onSubmit?: () => void;
};

export function CourseFormModal({
  open,
  mode = 'create',
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 3 }}>
            <CourseForm mode={mode} onCancel={onClose} onSubmit={onSubmit} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
