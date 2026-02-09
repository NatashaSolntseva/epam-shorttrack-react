import { AppBar, Toolbar, Box } from '@mui/material';
import { Logo } from './Logo';
import { UserName } from './UserName';
import { LoginButton } from './LoginButton';

type Props = {
  isAuthenticated: boolean;
  userName?: string;
  onAuthButtonClick: () => void;
};

export function Header({
  isAuthenticated,
  userName,
  onAuthButtonClick,
}: Props) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Toolbar sx={{ minHeight: 80 }}>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated && userName ? <UserName name={userName} /> : null}
          <LoginButton
            isAuthenticated={isAuthenticated}
            onClick={onAuthButtonClick}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
