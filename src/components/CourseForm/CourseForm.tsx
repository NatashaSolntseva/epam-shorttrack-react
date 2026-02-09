import { useMemo, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CourseAuthorsSection } from './CourseAuthorsSection';

import type { Author, Course } from '../../types/types';
import type {
  CreateCoursePayload,
  UpdateCoursePayload,
} from '../../services/coursesApi';
import { formatDate, formatDuration } from '../../ulils';
import { toMMDDYYYY } from '../../ulils/formatDate';

type Props = {
  mode?: 'create' | 'edit';

  authors: readonly Author[];
  onAuthorsChange: (updater: (prev: Author[]) => Author[]) => void;

  onCancel?: () => void;
  onSubmit?: (
    payload: CreateCoursePayload | UpdateCoursePayload,
    id?: string
  ) => void | Promise<void>;

  initialCourse?: Course | null;
};

type Touched = {
  title: boolean;
  description: boolean;
  duration: boolean;
  authors: boolean;
};

function validateMin2(value: string, fieldLabel: string): string | undefined {
  const val = value.trim();
  if (val.length < 2) return `${fieldLabel} must be at least 2 characters`;
  return undefined;
}

function validateDurationMinutes(value: string): string | undefined {
  const val = value.trim();
  if (!val) return 'Duration is required';
  if (!/^\d+$/.test(val)) return 'Duration must be a number';
  const n = Number(val);
  if (!Number.isFinite(n) || n <= 0) return 'Duration must be greater than 0';
  return undefined;
}

export function CourseForm({
  mode = 'create',
  authors,
  onAuthorsChange,
  onCancel,
  onSubmit,
  initialCourse = null,
}: Props) {
  const isEdit = mode === 'edit';

  const [title, setTitle] = useState(() =>
    isEdit ? (initialCourse?.title ?? '') : ''
  );
  const [description, setDescription] = useState(() =>
    isEdit ? (initialCourse?.description ?? '') : ''
  );
  const [duration, setDuration] = useState(() =>
    isEdit ? String(initialCourse?.duration ?? '') : ''
  );

  const [courseAuthorIds, setCourseAuthorIds] = useState<string[]>(() =>
    isEdit && initialCourse && Array.isArray(initialCourse.authors)
      ? initialCourse.authors
      : []
  );

  const [authorName, setAuthorName] = useState('');

  const [touched, setTouched] = useState<Touched>({
    title: false,
    description: false,
    duration: false,
    authors: false,
  });

  const courseAuthors: Author[] = useMemo(() => {
    const byId = new Map(authors.map((author) => [author.id, author] as const));
    return courseAuthorIds
      .map((id) => byId.get(id))
      .filter((author): author is Author => Boolean(author));
  }, [courseAuthorIds, authors]);

  const titleError = useMemo(() => validateMin2(title, 'Title'), [title]);
  const descriptionError = useMemo(
    () => validateMin2(description, 'Description'),
    [description]
  );
  const durationError = useMemo(
    () => validateDurationMinutes(duration),
    [duration]
  );

  const authorsError = useMemo(() => {
    if (courseAuthorIds.length === 0) return 'At least one author is required';
    return undefined;
  }, [courseAuthorIds.length]);

  const isValid =
    !titleError && !descriptionError && !durationError && !authorsError;

  const showTitleError = touched.title && Boolean(titleError);
  const showDescriptionError = touched.description && Boolean(descriptionError);
  const showDurationError = touched.duration && Boolean(durationError);
  const showAuthorsError = touched.authors && Boolean(authorsError);

  const durationHHmm = formatDuration(Number(duration));

  const submitCourse = async () => {
    setTouched({
      title: true,
      description: true,
      duration: true,
      authors: true,
    });
    if (!isValid) return;

    const durationMinutes = Number(duration.trim());

    if (isEdit) {
      if (!initialCourse?.id) return;

      const payload: UpdateCoursePayload = {
        title: title.trim(),
        description: description.trim(),
        creationDate:
          initialCourse.creationDate ?? formatDate(toMMDDYYYY(new Date())),
        duration: durationMinutes,
        authors: courseAuthorIds,
      };

      await onSubmit?.(payload, initialCourse.id);
      return;
    }

    const payload: CreateCoursePayload = {
      title: title.trim(),
      description: description.trim(),
      creationDate: formatDate(toMMDDYYYY(new Date())),
      duration: durationMinutes,
      authors: courseAuthorIds,
    };

    await onSubmit?.(payload);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitCourse();
  };

  return (
    <Card sx={{ borderRadius: 1.5, boxShadow: 3 }}>
      <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {isEdit ? 'Course Edit' : 'Course Create'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Title"
              placeholder="Course title"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              error={showTitleError}
              helperText={showTitleError ? titleError : ' '}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Description"
              placeholder="Course description"
              fullWidth
              multiline
              minRows={4}
              slotProps={{ inputLabel: { shrink: true } }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, description: true }))}
              error={showDescriptionError}
              helperText={showDescriptionError ? descriptionError : ' '}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Duration
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Duration"
                placeholder="Course duration in minutes"
                size="small"
                sx={{ width: { xs: '100%', sm: 280 } }}
                value={duration}
                slotProps={{ inputLabel: { shrink: true } }}
                onChange={(e) => setDuration(e.target.value)}
                onBlur={() =>
                  setTouched((touch) => ({ ...touch, duration: true }))
                }
                error={showDurationError}
                helperText={showDurationError ? durationError : ' '}
              />

              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: '2px' }}
              >
                <b>{durationHHmm}</b>
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <CourseAuthorsSection
            authorName={authorName}
            onAuthorNameChange={setAuthorName}
            authors={authors}
            onAuthorsChange={onAuthorsChange}
            courseAuthors={courseAuthors}
            onAddAuthorToCourse={(id) => {
              setCourseAuthorIds((prev) =>
                prev.includes(id) ? prev : [...prev, id]
              );
              setTouched((touch) => ({ ...touch, authors: true }));
            }}
            onRemoveAuthorFromCourse={(id) => {
              setCourseAuthorIds((prev) => prev.filter((x) => x !== id));
              setTouched((touch) => ({ ...touch, authors: true }));
            }}
            onRemoveDeletedAuthorFromCourse={(id) => {
              setCourseAuthorIds((prev) => prev.filter((x) => x !== id));
              setTouched((touch) => ({ ...touch, authors: true }));
            }}
            validationError={showAuthorsError ? authorsError : undefined}
          />

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              disableElevation
              onClick={onCancel}
              sx={{ px: 4 }}
            >
              CANCEL
            </Button>

            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{ px: 4 }}
            >
              {isEdit ? 'UPDATE COURSE' : 'CREATE COURSE'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
