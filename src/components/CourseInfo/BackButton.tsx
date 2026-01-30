import { Button } from '@mui/material';

type Props = { onClick?: () => void };

export function BackButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      disableElevation
      onClick={onClick}
      sx={{ px: 5, py: 1.2 }}
    >
      BACK
    </Button>
  );
}
