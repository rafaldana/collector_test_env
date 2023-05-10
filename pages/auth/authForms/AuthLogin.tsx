import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
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
  email: yup.string().required("E-Mail ist erforderlich"),
  password: yup
    .string()
    .min(8, "Das Passwort sollte mindestens 8 Zeichen lang sein")
    .required("Passwort wird benötigt"),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();

  const onLoginFormSubmit = async (values) => {
    console.log("submit: ", values);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    console.log("STATUS: ", status);

    if (status.ok) {
      router.push(status.url);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
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
      <AuthSocialButtons title="Anmelden mit" />
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
              Oder melde dich an mit
            </Typography>
          </Divider>
        </Box>

        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Benutzername</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Passwort</CustomFormLabel>
            <CustomTextField
              id="password"
              type={showPassword ? "text" : "password"}
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
                label="Merke dieses Gerät"
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
            Anmelden
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
