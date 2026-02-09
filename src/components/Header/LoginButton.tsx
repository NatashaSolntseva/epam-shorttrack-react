import { Button } from '@mui/material';

type Props = {
  isAuthenticated: boolean;
  onClick: () => void;
};

export function LoginButton({ isAuthenticated, onClick }: Props) {
  return (
    <Button variant="contained" disableElevation onClick={onClick}>
      {isAuthenticated ? 'LOGOUT' : 'LOGIN'}
    </Button>
  );
}
