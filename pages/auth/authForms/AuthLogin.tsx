import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import CustomCheckbox from '@components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from '@components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box, Button, Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, Stack, Typography
} from '@mui/material';

import { loginType } from '../../../src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';

const loginValidationSchema = yup.object({
  username: yup
    .string()
    .min(2, "Username should be of minimum 2 characters length")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onLoginFormSubmit = async (values) => {
    console.log("env: ", process.env.NEXT_PUBLIC_CALLBACK_URL);
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: onLoginFormSubmit,
  });
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />

      <form onSubmit={formik.handleSubmit}>
        <Box mt={3}>
          <Divider>
            <Typography
              component="span"
              color="textSecondary"
              variant="h6"
              fontWeight="400"
              position="relative"
              px={2}
            >
              or sign in with
            </Typography>
          </Divider>
        </Box>

        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("username")}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
