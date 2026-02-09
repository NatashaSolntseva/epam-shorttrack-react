import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createAuthor, deleteAuthorById } from '../../services/coursesApi';

export type AuthorItem = {
  id: string;
  name: string;
};

type Props = {
  authorName: string;
  onAuthorNameChange: (value: string) => void;

  authors: readonly AuthorItem[];
  onAuthorsChange: (updater: (prev: AuthorItem[]) => AuthorItem[]) => void;

  onAddAuthorToCourse?: (authorId: string) => void;

  courseAuthors: readonly AuthorItem[];
  onRemoveAuthorFromCourse?: (authorId: string) => void;

  onRemoveDeletedAuthorFromCourse?: (authorId: string) => void;

  validationError?: string;
};

function validateAuthorName(value: string): string | undefined {
  const val = value.trim();
  if (!val) return 'Author name is required';
  if (val.length < 2) return 'Author name must be at least 2 characters';
  return undefined;
}

export function CourseAuthorsSection({
  authorName,
  onAuthorNameChange,
  authors,
  onAuthorsChange,
  onAddAuthorToCourse,
  courseAuthors,
  onRemoveAuthorFromCourse,
  onRemoveDeletedAuthorFromCourse,
  validationError,
}: Props) {
  const isCourseAuthorsEmpty = courseAuthors.length === 0;

  const [authorTouched, setAuthorTouched] = useState(false);
  const [authorServerError, setAuthorServerError] = useState<string>('');

  const authorNameError = useMemo(
    () => validateAuthorName(authorName),
    [authorName]
  );

  const showAuthorNameError = authorTouched && Boolean(authorNameError);

  const handleCreateAuthor = async () => {
    setAuthorTouched(true);
    setAuthorServerError('');

    const error = validateAuthorName(authorName);
    if (error) return;

    const name = authorName.trim();

    try {
      const created = await createAuthor({ name });
      onAuthorsChange((prev) => [...prev, created]);
      onAuthorNameChange('');
      setAuthorTouched(false);
    } catch (e) {
      console.error(e);
      setAuthorServerError('Failed to create author. Please try again.');
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    try {
      await deleteAuthorById(id);
      onAuthorsChange((prev) => prev.filter((author) => author.id !== id));
      onRemoveDeletedAuthorFromCourse?.(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Authors
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
          gap: 4,
          alignItems: 'start',
        }}
      >
        <Box>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <TextField
              label="Author Name"
              placeholder="Author name"
              size="small"
              fullWidth
              value={authorName}
              onChange={(e) => {
                onAuthorNameChange(e.target.value);
                setAuthorServerError('');
              }}
              onBlur={() => setAuthorTouched(true)}
              error={showAuthorNameError}
              helperText={
                (showAuthorNameError ? authorNameError : authorServerError) ||
                ' '
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Button
              variant="contained"
              disableElevation
              onClick={handleCreateAuthor}
              sx={{
                px: 3,
                height: 40,
                whiteSpace: 'nowrap',
                mt: '2px',
                flexShrink: 0,
              }}
            >
              CREATE AUTHOR
            </Button>
          </Stack>

          <Typography
            variant="subtitle2"
            sx={{ mt: 3, mb: 1, fontWeight: 700 }}
          >
            All Authors List
          </Typography>

          <Stack spacing={1}>
            {authors.map((a) => (
              <Stack
                key={a.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">{a.name}</Typography>

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    aria-label="add author to course"
                    size="small"
                    onClick={() => onAddAuthorToCourse?.(a.id)}
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    aria-label="delete author from server"
                    size="small"
                    onClick={() => handleDeleteAuthor(a.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Course Authors
          </Typography>

          {validationError ? (
            <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
              {validationError}
            </Typography>
          ) : null}

          {isCourseAuthorsEmpty ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Author list is empty
            </Typography>
          ) : null}

          <Stack
            spacing={1}
            sx={{ alignItems: { xs: 'stretch', md: 'flex-end' } }}
          >
            {courseAuthors.map((a) => (
              <Stack key={a.id} direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">{a.name}</Typography>
                <IconButton
                  aria-label="remove author from course"
                  size="small"
                  onClick={() => onRemoveAuthorFromCourse?.(a.id)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
