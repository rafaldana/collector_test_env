import { signIn } from 'next-auth/react';

import CustomSocialButton from '@components/forms/theme-elements/CustomSocialButton';
import { Avatar, Box } from '@mui/material';
import { Stack } from '@mui/system';

import { signInType } from '../../../src/types/auth/auth';

const AuthSocialButtons = ({ title }: signInType) => {
  const handleGoogleSignIn = async () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}`,
    });
  };

  const handleTwitterSignIn = async () => {
    signIn("twitter", {
      callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}`,
    });
  };
  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <CustomSocialButton onClick={handleGoogleSignIn}>
          <Avatar
            src={"/images/svgs/google-icon.svg"}
            alt={"icon1"}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              whiteSpace: "nowrap",
              mr: { sm: "3px" },
            }}
          >
            {title}{" "}
          </Box>{" "}
          Google
        </CustomSocialButton>
        <CustomSocialButton onClick={handleTwitterSignIn}>
          <Avatar
            src={"/images/svgs/twitter-icon.svg"}
            alt={"icon2"}
            sx={{
              width: 25,
              height: 25,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              whiteSpace: "nowrap",
              mr: { sm: "3px" },
            }}
          >
            {title}{" "}
          </Box>{" "}
          TW
        </CustomSocialButton>
      </Stack>
    </>
  );
};

export default AuthSocialButtons;
