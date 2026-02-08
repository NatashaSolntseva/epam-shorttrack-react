import { useState } from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { LoginFormField } from './LoginFormField';
import { AppButton } from '../AppButton/AppButton';

type Props = {
  onLogin?: (email: string, password: string) => void;
};

export function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(email, password);
    console.log('login', { email, password });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: 6,
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
                  label="Email"
                  value={email}
                  onChange={setEmail}
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
