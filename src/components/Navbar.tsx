import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import Logotipo from '../../public/Logotipo.png';

const Navbar: FC = () => {
  return (
    <AppBar
      position="absolute"
      color="primary"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Box component="img" height={30} src={Logotipo} mr={1} />
        <Typography variant="h6" color="inherit" noWrap>
          Astratep
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
