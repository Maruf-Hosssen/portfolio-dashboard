'use client';
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userLogin } from '@/service/userlogin';
import { storeUserInfo } from '@/service/auth.service';

interface IFormInput {
  email: string;
  password: string;
}
const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await userLogin(data);
      if (res?.data?.token) {
        storeUserInfo({ accessToken: res?.data?.token });
        reset();
        router.push('/');
      } else {
        setError(res.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.2)', padding: '30px' }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h5"
            fontFamily="roboto"
            color="#212121"
          >
            My Dashboard Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('email', { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('password', { required: true })}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Grid>
          {error && (
            <Box>
              <Typography
                sx={{
                  padding: '1px',

                  color: 'red',
                  marginTop: '5px',
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
        </form>
        <Grid item>
          <Typography component="p" sx={{ fontWeight: 300, color: '#616161' }}>
            You dont have account?{' '}
            <Link
              href="/register"
              style={{
                color: '#039be5',
                textDecoration: 'underline',
              }}
            >
              create a new account
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
