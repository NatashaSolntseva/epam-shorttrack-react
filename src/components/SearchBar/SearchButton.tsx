import { Button } from '@mui/material';

type Props = {
  onClick: () => void;
};

export function SearchButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{ px: 4, py: 1 }}
      onClick={onClick}
    >
      SEARCH
    </Button>
  );
}
