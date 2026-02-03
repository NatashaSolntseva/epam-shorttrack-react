import { Box } from '@mui/material';
import logo from '../../assets/logo.png';

type LogoProps = {
  alt?: string;
  height?: number;
};

export function Logo({ alt = 'Logo', height = 48 }: LogoProps) {
  return (
    <Box
      component="img"
      src={logo}
      alt={alt}
      sx={{
        height,
        width: 'auto',
        display: 'block',
      }}
    />
  );
}
