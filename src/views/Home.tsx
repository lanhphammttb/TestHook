import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

// Define the form data type
interface IFormInput {
  name: string;
  email: string;
  age: number;
}

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ')
    .required('Vui lòng nhập Email'),
  age: yup
    .number()
    .transform((value: any) => (isNaN(value) ? undefined : value))
    .min(18, 'Phải từ 18 tuổi')
    .max(65, 'Không được quá 65 tuổi')
    .integer('Tuổi phải là số nguyên')
    .required('Vui lòng nhập tuổi')
});

const MyForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IFormInput) => {
    alert(
      'Tên: ' +
        data.name +
        ',' +
        'Email: ' +
        data.email +
        ',' +
        'Tuổi: ' +
        data.age +
        '.'
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
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Tên"
              {...field}
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="Email"
              {...field}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              label="Tuổi"
              type="number"
              {...field}
              inputProps={{ min: 18, max: 65 }}
              error={errors.age ? true : false}
              helperText={errors.age ? errors.age.message : ''}
            />
          )}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default MyForm;
