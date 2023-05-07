import React from 'react';

import {
    Box, Button, Grid, LinearProgress, Paper, Rating, Stack, Tab, Tabs, Typography
} from '@mui/material';
import { IconPencil } from '@tabler/icons-react';

import ChildCard from '../../../../components/shared/ChildCard';

interface ProductCardProps {
  like: number;
  star: number;
  value?: number;
}

interface TabProps {
  children: React.ReactNode;
  index: number;
  value?: number;
}

// progress
function ProgressBar({ like, star, value, ...others }: ProductCardProps) {
  return (
    <Box display={"flex"} alignItems="center" gap="20px">
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          star
        )} Stars`}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          value={value}
          variant="determinate"
          color="primary"
          {...others}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle2">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>
  );
}

const TabPanel = (props: TabProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProductDesc = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "grey.100" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Description" {...a11yProps(0)} />
          </Tabs>
        </Box>
        {/* ------------------------------------------- */}
        {/* Decription */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={0}>
          <Typography variant="h5">
            Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a,
            aliquet sit amet lorem pellentesque eu tincidunt a, aliquet sit amet
            lorem.
          </Typography>
          <Typography color="textSecondary" mt={4}>
            Cras eget elit semper, congue sapien id, pellentesque diam. Nulla
            faucibus diam nec fermentum ullamcorper. Praesent sed ipsum ut augue
            vestibulum malesuada. Duis vitae volutpat odio. Integer sit amet
            elit ac justo sagittis dignissim.
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            fontWeight={400}
            mt={4}
          >
            Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin
            justo diam, venenatis sit amet eros in, iaculis auctor magna.
            Pellentesque sit amet accumsan urna, sit amet pretium ipsum. Fusce
            condimentum venenatis mauris et luctus. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae;
          </Typography>
        </TabPanel>
      </Box>
    </ChildCard>
  );
};

export default ProductDesc;
