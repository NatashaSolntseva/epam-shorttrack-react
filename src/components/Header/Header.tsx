import { AppBar, Toolbar, Box } from '@mui/material';
import { Logo } from './Logo';
import { UserName } from './UserName';
import { LoginButton } from './LoginButton';

export function Header() {
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
          <UserName name="Harry Potter" />
          <LoginButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
