'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import { useAppSelector } from "@/app/Redux/store";

const schema = zod.object({
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  confirmPassword: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type Values = zod.infer<typeof schema>;

const defaultValues = { password: '', confirmPassword: '' } satisfies Values;

export function UpdatePasswordForm(): React.JSX.Element {

  const token  = useAppSelector((state) => state.reducers.userReducer.token);

  const { control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const updatePassword = async (data: Values) => {
    try {
      const res = await axios({
        url: "http://localhost:5600/auth/changePassword",
        method: "post",
        data: data,
        headers: {Authorization: `Bearer ${token}`}
      });
      if (res.data.msg) {
        window.alert(res.data.msg);
        return;
      }
    } catch (e) {
      window.alert('ERROR');
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput {...field} label="Password" type="password" />
                  {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                  <InputLabel>Confirm password</InputLabel>
                  <OutlinedInput {...field} label="Confirm password" type="password" />
                  {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Update</Button>
        </CardActions>
      </Card>
    </form>
  );
}
