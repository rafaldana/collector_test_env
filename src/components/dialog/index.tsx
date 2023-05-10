import { Grid } from '@mui/material';

import PageContainer from '../../../src/components/container/PageContainer';
import ChildCard from '../../../src/components/shared/ChildCard';
import ParentCard from '../../../src/components/shared/ParentCard';
import AlertDialog from '../../../src/components/ui-components/dialog/AlertDialog';
import FormDialog from '../../../src/components/ui-components/dialog/FormDialog';
import FullscreenDialog from '../../../src/components/ui-components/dialog/FullscreenDialog';
import MaxWidthDialog from '../../../src/components/ui-components/dialog/MaxWidthDialog';
import ResponsiveDialog from '../../../src/components/ui-components/dialog/ResponsiveDialog';
import ScrollContentDialog from '../../../src/components/ui-components/dialog/ScrollContentDialog';
import SimpleDialog from '../../../src/components/ui-components/dialog/SimpleDialog';
import TransitionDialog from '../../../src/components/ui-components/dialog/TransitionDialog';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';

const MuiDialog = () => (
  <PageContainer>
    {/* breadcrumb */}
    <Breadcrumb title="Dialog" items={[]} />
    {/* end breadcrumb */}

    <ParentCard title="Dialog">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Simple">
            <SimpleDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Alert">
            <AlertDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Transition">
            <TransitionDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Form">
            <FormDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Full screen">
            <FullscreenDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Max width">
            <MaxWidthDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Scrolling Conten ">
            <ScrollContentDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Responsive Fullscreen">
            <ResponsiveDialog />
          </ChildCard>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
);
export default MuiDialog;
