// src/components/Auth.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../authSlice';
import { RootState, AppDispatch } from '../store';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  username: string;
  password: string;
}

// Define the validation schema using Yup
const schema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên'),
  password: yup.string().required('Vui lòng nhập password')
});

const Auth: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // const handleLogin = () => {
  //   dispatch(authenticate({ username, password }));
  // };

  const onSubmit = (data: IFormInput) => {
    dispatch(
      authenticate({ username: data?.username, password: data?.password })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          marginTop: '70px',
          '& .MuiTextField-root': { width: '30ch' }
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            marginTop: '30px'
          }}
        >
          Login
        </Typography>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label="Tên"
              {...field}
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              {...field}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ''}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={auth.status === 'loading'}
          sx={{
            minWidth: '150px'
          }}
        >
          {auth.status === 'loading' ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        {auth.status === 'failed' && (
          <Alert severity="error">{auth.error}</Alert>
        )}
      </Box>
    </form>
  );
};

export default Auth;
