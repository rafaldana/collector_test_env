import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar, Box, Button, Divider, IconButton, Menu, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from '@store/Store';
import { IconMail, IconSum } from '@tabler/icons-react';

import * as dropdownData from './data';

const Profile = () => {
  const { data: session } = useSession();
  const [anchorProfile, setAnchorProfile] = useState(null);
  const handleOpenProfileMenu = (event: any) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorProfile(null);
  };
  const handleLogout = () => {
    signOut();
  };

  const amount: number = useSelector((state) => state.userReducer.amount);

  return (
    <>
      {session ? (
        <>
          <Box>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <IconSum />
              <Typography my={5} variant="h6" fontWeight={600}>
                {amount}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label=""
              color="inherit"
              aria-controls="msgs-menu"
              aria-haspopup="true"
              sx={{
                ...(typeof anchorProfile === "object" && {
                  color: "primary.main",
                }),
              }}
              onClick={handleOpenProfileMenu}
            >
              <Avatar
                src={
                  session.user?.image
                    ? session.user?.image
                    : "/images/profile/user-1.jpg"
                }
                alt={"ProfileImg"}
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
              id="msgs-menu"
              anchorEl={anchorProfile}
              keepMounted
              open={Boolean(anchorProfile)}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              sx={{
                "& .MuiMenu-paper": {
                  width: "360px",
                  p: 4,
                },
              }}
            >
              <Typography variant="h5">User Profile</Typography>
              <Stack direction="row" py={3} spacing={2} alignItems="center">
                <Avatar
                  src={
                    session.user?.image
                      ? session.user?.image
                      : "/images/profile/user-1.jpg"
                  }
                  alt={"ProfileImg"}
                  sx={{ width: 95, height: 95 }}
                />
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    fontWeight={600}
                  >
                    {session.user?.name ? session.user?.name : ""}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Collector
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <IconMail width={15} height={15} />
                    {session.user?.email ? session.user?.email : ""}
                  </Typography>
                </Box>
              </Stack>
              <Divider />
              {dropdownData.profile.map((profile) => (
                <Box key={profile.title}>
                  <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                    <Link href={profile.href}>
                      <Stack direction="row" spacing={2}>
                        <Box
                          width="45px"
                          height="45px"
                          bgcolor="primary.light"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Avatar
                            src={profile.icon}
                            alt={profile.icon}
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 0,
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="textPrimary"
                            className="text-hover"
                            noWrap
                            sx={{
                              width: "240px",
                            }}
                          >
                            {profile.title}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            sx={{
                              width: "240px",
                            }}
                            noWrap
                          >
                            {profile.subtitle}
                          </Typography>
                        </Box>
                      </Stack>
                    </Link>
                  </Box>
                </Box>
              ))}
              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Menu>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default Profile;
