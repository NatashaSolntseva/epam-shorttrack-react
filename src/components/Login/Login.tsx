import { useState } from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { LoginFormField } from './LoginFormField';
import { AppButton } from '../AppButton/AppButton';

type Props = {
  onLogin?: (userName: string, password: string) => void;
};

export function Login({ onLogin }: Props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onLogin?.(userName, password);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 520 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}
        >
          Login
        </Typography>

        <Card sx={{ borderRadius: 1.5, boxShadow: 3 }}>
          <CardContent sx={{ p: 5, '&:last-child': { pb: 5 } }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Box sx={{ width: 200 }}>
                <LoginFormField
                  label="User Name"
                  value={userName}
                  onChange={setUserName}
                />
              </Box>

              <Box sx={{ width: 200 }}>
                <LoginFormField
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  type="password"
                />
              </Box>
              <AppButton
                type="submit"
                text="LOGIN"
                width={200}
                py={1.2}
                sx={{ mt: 1 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
