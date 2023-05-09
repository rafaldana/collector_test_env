import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { IconPhoto, IconUserCircle } from '@tabler/icons-react';

const ProfileTab = () => {
  const location = useRouter();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const ProfileTabs = [
    {
      label: "Profile",
      icon: <IconUserCircle size="20" />,
      to: "/",
      hide: false,
    },
    {
      label: "Pre-auction exhibition",
      icon: <IconPhoto size="20" />,
      to: "/collection",
      hide: false,
    },
  ];

  return (
    <Box
      mt={1}
      sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}
    >
      <Box justifyContent={"end"} display="flex">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable prevent tabs example"
        >
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{
                  minHeight: "50px",
                  display: tab.hide ? "none" : "inline-flex",
                }}
                icon={tab.icon}
                component={Link}
                href={tab.to}
                value={tab.to}
                key={tab.label}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileTab;
