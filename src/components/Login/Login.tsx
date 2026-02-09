import { useMemo, useState } from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { LoginFormField } from './LoginFormField';
import { AppButton } from '../AppButton/AppButton';

type Props = {
  onLogin?: (userName: string, password: string) => void;
  serverError?: string;
  onServerErrorClear?: () => void;
};

type Errors = {
  userName?: string;
  password?: string;
};

function validateUserName(value: string): string | undefined {
  const val = value.trim();
  if (!val) return 'Username is required';
  if (val.length < 3) return 'Username must be at least 3 characters';
  if (val.length > 20) return 'Username must be at most 20 characters';
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return undefined;
}

export function Login({ onLogin, serverError, onServerErrorClear }: Props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState<{
    userName: boolean;
    password: boolean;
  }>({
    userName: false,
    password: false,
  });

  const errors: Errors = useMemo(
    () => ({
      userName: validateUserName(userName),
      password: validatePassword(password),
    }),
    [userName, password]
  );

  const isValid = !errors.userName && !errors.password;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setTouched({ userName: true, password: true });

    if (!isValid) return;

    await onLogin?.(userName.trim(), password);
  };

  const handleUserNameChange = (value: string) => {
    onServerErrorClear?.();
    setUserName(value);
  };

  const handlePasswordChange = (value: string) => {
    onServerErrorClear?.();
    setPassword(value);
  };

  const showUserNameError = touched.userName && Boolean(errors.userName);
  const showPasswordError = touched.password && Boolean(errors.password);

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
        {serverError ? (
          <Typography
            variant="body2"
            sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}
          >
            {serverError}
          </Typography>
        ) : null}

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
              <Box sx={{ width: '100%', maxWidth: 360 }}>
                <LoginFormField
                  label="User Name"
                  value={userName}
                  onChange={handleUserNameChange}
                  onBlur={() => setTouched((t) => ({ ...t, userName: true }))}
                  error={showUserNameError}
                  helperText={showUserNameError ? errors.userName : ' '}
                />
              </Box>

              <Box sx={{ width: '100%', maxWidth: 360 }}>
                <LoginFormField
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  error={showPasswordError}
                  helperText={showPasswordError ? errors.password : ' '}
                />
              </Box>
              <AppButton
                type="submit"
                text="LOGIN"
                width={200}
                py={1.2}
                sx={{ mt: 1 }}
                disabled={!isValid}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
