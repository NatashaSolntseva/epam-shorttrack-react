import { Button } from '@mui/material';

type Props = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
  px?: number;
  py?: number;
  sx?: object;
};

export function AppButton({
  text,
  onClick,
  type = 'button',
  variant = 'contained',
  disabled = false,
  width,
  height,
  px,
  py,
  sx,
}: Props) {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      disableElevation={variant === 'contained'}
      onClick={onClick}
      sx={{
        ...(width !== undefined ? { width } : null),
        ...(height !== undefined ? { height } : null),
        ...(px !== undefined ? { px } : null),
        ...(py !== undefined ? { py } : null),
        ...sx,
      }}
    >
      {text}
    </Button>
  );
}
