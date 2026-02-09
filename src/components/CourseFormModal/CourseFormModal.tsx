import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CourseForm } from '../CourseForm/CourseForm';
import type { Author, Course } from '../../types/types';
import type {
  CreateCoursePayload,
  UpdateCoursePayload,
} from '../../services/coursesApi';

type Props = {
  open: boolean;
  mode?: 'create' | 'edit';
  authors: readonly Author[];
  onClose: () => void;
  onSubmit?: (
    payload: CreateCoursePayload | UpdateCoursePayload,
    id?: string
  ) => void | Promise<void>;
  onAuthorsChange: (updater: (prev: Author[]) => Author[]) => void;
  initialCourse?: Course | null;
};

export function CourseFormModal({
  open,
  mode = 'create',
  authors,
  onClose,
  onSubmit,
  onAuthorsChange,
  initialCourse = null,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 3 }}>
            <CourseForm
              key={`${mode}-${initialCourse?.id ?? 'new'}`}
              mode={mode}
              onCancel={onClose}
              onSubmit={onSubmit}
              authors={authors}
              onAuthorsChange={onAuthorsChange}
              initialCourse={initialCourse}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
