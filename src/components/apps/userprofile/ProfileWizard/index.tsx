import { useRouter } from 'next/navigation';
import React from 'react';

import PageContainer from '@components/container/PageContainer';
import ParentCard from '@components/shared/ParentCard';
import { Alert, Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Vimeo from '@u-wave/react-vimeo';

const steps = ["Start", "Video1", "Video2", "video3"];

const ProfileWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { push } = useRouter();

  const isStepOptional = (step: any) => step === 1;

  const isStepSkipped = (step: any) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);

      return newSkipped;
    });
  };

  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box mt={12} mb={12}>
            <Typography variant="h2" align="center">
              Cool Welcome text
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box mt={5}>
            <Vimeo className="video" video="824515524" />
          </Box>
        );
      case 2:
        return (
          <Box mt={5}>
            <Vimeo className="video" video="824516071" />
          </Box>
        );
      case 3:
        return (
          <Box mt={5}>
            <Vimeo className="video" video="824573151" />
          </Box>
        );
      default:
        break;
    }
  };

  const handleMoveToAuction = () => {
    push("/auctions/list");
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer>
      <ParentCard title="Knowledge">
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={14} mt={12} mb={5}>
                <Alert severity="success">
                  <Typography variant="h5" align="center">
                    All steps completed - you&apos;re finished
                  </Typography>
                </Alert>

                <Box textAlign="right">
                  <Button
                    onClick={handleMoveToAuction}
                    variant="contained"
                    color="error"
                  >
                    Go to next Step
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>

              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box flex="1 1 auto" />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={
                    activeStep === steps.length - 1 ? "success" : "secondary"
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default ProfileWizard;
