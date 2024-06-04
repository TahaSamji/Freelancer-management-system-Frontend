'use client';

import { useAppSelector } from "@/app/Redux/store";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = zod.object({
  fullName: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  utype: zod.literal('Admin').default('Admin'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { fullName: '', email: '', password: '', utype: 'Admin' } satisfies Values;

export function AddAdmin() {
  const [open, setOpen] = useState(false);
  const token = useAppSelector((state) => state.reducers.userReducer.token);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const addAdmin = async (data: Values) => {
    try {
      const res = await axios({
        url: "http://localhost:5600/user/addAdmin",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: data,
      });
      if (res.data.msg) {
        window.alert(res.data.msg);
        handleClose();
      }
    } catch (error) {
      console.error(error);
      window.alert("ERROR");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add Admin
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Admin</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(addAdmin)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name='fullName'
                render={({ field }) => (
                  <FormControl error={Boolean(errors.fullName)} fullWidth>
                    <InputLabel>Full Name</InputLabel>
                    <OutlinedInput {...register('fullName')} label="Full Name" name='fullName' />
                    {errors.fullName ? <FormHelperText>{errors.fullName.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)} fullWidth>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...register('email')} label="Email address" type="email" name='email' />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)} fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput {...field} {...register('password')} label="Password" type="password" />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              {/* <Controller
                control={control}
                name="utype"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <OutlinedInput {...field} {...register('utype')} type="hidden" />
                  </FormControl>
                )}
              /> */}
              <Button type="submit" variant="contained" color="primary">
                Add Admin
              </Button>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}