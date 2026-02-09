import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  mode?: 'create' | 'edit';
  onCancel?: () => void;
  onSubmit?: () => void;
};

export function CourseForm({ mode = 'create', onCancel, onSubmit }: Props) {
  const isEdit = mode === 'edit';

  return (
    <Card
      sx={{
        borderRadius: 1.5,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {isEdit ? 'Course Edit' : 'Course Create'}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Title"
            placeholder="Input text"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Description"
            placeholder="Input text"
            fullWidth
            multiline
            minRows={4}
            InputLabelProps={{ shrink: true }}
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
              placeholder="Input text"
              size="small"
              sx={{ width: { xs: '100%', sm: 280 } }}
            />

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <b>00:00</b> hours
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Authors
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            <Box>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <TextField
                  label="Author Name"
                  placeholder="Input text"
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ px: 3, height: 40, whiteSpace: 'nowrap' }}
                >
                  CREATE AUTHOR
                </Button>
              </Stack>

              <Typography
                variant="subtitle2"
                sx={{ mt: 3, mb: 1, fontWeight: 700 }}
              >
                Authors List
              </Typography>

              <Stack spacing={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Author One</Typography>
                  <IconButton aria-label="add author" size="small">
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Author Two</Typography>
                  <IconButton aria-label="add author" size="small">
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Course Authors
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 2 }}
              >
                Author list is empty
              </Typography>

              <Stack
                spacing={1}
                sx={{ alignItems: { xs: 'stretch', md: 'flex-end' } }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">Author Three</Typography>
                  <IconButton aria-label="remove author" size="small">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>

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
            variant="contained"
            disableElevation
            onClick={onSubmit}
            sx={{ px: 4 }}
          >
            {isEdit ? 'UPDATE COURSE' : 'CREATE COURSE'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
