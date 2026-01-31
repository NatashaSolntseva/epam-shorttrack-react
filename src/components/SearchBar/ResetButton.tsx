import { Button } from '@mui/material';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export function ResetButton({ onClick, disabled }: Props) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      sx={{ px: 3, py: 1 }}
    >
      RESET
    </Button>
  );
}
