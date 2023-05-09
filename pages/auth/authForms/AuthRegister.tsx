import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';

import CustomFormLabel from '@components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { registerType } from '../../../src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';

const registerValidationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Der Name sollte mindestens 2 Zeichen lang sein")
    .required("Name ist erforderlich"),
  email: yup
    .string()
    .email("Geben Sie eine gültige E-Mail-Adresse ein")
    .required("E-Mail ist erforderlich"),
  password: yup
    .string()
    .min(8, "Das Passwort sollte mindestens 8 Zeichen lang sein")
    .required("Passwort wird benötigt"),
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();
  const onRegisterFormSubmit = async (values) => {
    console.log(values);
    const { email, name, password } = values;
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      console.log(data);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: onRegisterFormSubmit,
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

        <Box>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Benutzername</CustomFormLabel>
            <CustomTextField
              id="name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomFormLabel htmlFor="password">Passwort</CustomFormLabel>
            <CustomTextField
              id="password"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? "text" : "password"}
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
          </Stack>
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

export default AuthRegister;
