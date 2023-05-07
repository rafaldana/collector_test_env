import { signOut, useSession } from 'next-auth/react';

import { Avatar, Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { AppState, useSelector } from '@store/Store';
import { IconPower } from '@tabler/icons-react';

export const Profile = () => {
  const { data: session } = useSession();
  console.log(session);
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu && session ? (
        <>
          <Avatar alt="Remy Sharp" src={session.user.image} />

          <Box>
            <Typography variant="h6">{session.user.name}</Typography>
            <Typography variant="caption">User</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={handleSignOut}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
