import { getSession } from 'next-auth/react';

import PageContainer from '@components/container/PageContainer';
import Customers from '@components/dashboards/modern/Customers';
import EmployeeSalary from '@components/dashboards/modern/EmployeeSalary';
import MonthlyEarnings from '@components/dashboards/modern/MonthlyEarnings';
import Projects from '@components/dashboards/modern/Projects';
import RevenueUpdates from '@components/dashboards/modern/RevenueUpdates';
import SellingProducts from '@components/dashboards/modern/SellingProducts';
import Social from '@components/dashboards/modern/Social';
import TopCards from '@components/dashboards/modern/TopCards';
import TopPerformers from '@components/dashboards/modern/TopPerformers';
import WeeklyStats from '@components/dashboards/modern/WeeklyStats';
import YearlyBreakup from '@components/dashboards/modern/YearlyBreakup';
import Welcome from '@layouts/full/shared/welcome/Welcome';
import { Box, Grid } from '@mui/material';

const Home = ({ session }) => {
  return (
    <PageContainer>
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <RevenueUpdates />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <EmployeeSalary />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <WeeklyStats />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid>
        </Grid>
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
