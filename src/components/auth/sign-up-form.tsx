'use client';
import axios from 'axios';
import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { useEffect,useState,ChangeEvent } from 'react';

const schema = zod.object({
  fullName: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  utype : zod.string(),
  
});

type Values = zod.infer<typeof schema>;

const defaultValues = {  fullName: '', email: '', password: '', utype:''
 } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();
  const [data, setData] = useState({
    email: "",
    password: "",
    fullName: "",
    utype :'',
  });
  const [isPending, setIsPending] = React.useState<boolean>(false);
  useEffect(() => {
    
    console.log(data);
  }, [data]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });


  // const onSubmit = React.useCallback(
  //   async (values: Values): Promise<void> => {
  //     setIsPending(true);

  //     const { error } = await authClient.signUp(values);

  //     if (error) {
  //       setError('root', { type: 'server', message: error });
  //       setIsPending(false);
  //       return;
  //     }

  //     // Refresh the auth state
  //     await checkSession?.();

  //     // UserProvider, for this case, will not refresh the router
  //     // After refresh, GuestGuard will handle the redirect
  //     router.refresh();
  //   },
  //   [checkSession, router, setError]
  // );
  
  const SignupSubmit = async (data : Values) => {
  
    try {
  console.log(data);
      const res = await axios({
        
        url: "http://localhost:5600/auth/signup",
        method: "post",
        data: data,
      });
      
      if (res.data.msg){

        window.alert(res.data.msg);
      
      return; // Return to prevent further execution
    
    }
      
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(SignupSubmit)}>
        <Stack spacing={2}>
         <Controller
         control={control}
         name='fullName'
         render={({ field }) => (
              <FormControl error={Boolean(errors.fullName)}>
                <InputLabel>Full Name</InputLabel>
                <OutlinedInput  {...register('fullName')} label="Full Name" name='fullName'  onChange={handleInputChange}/>
                {errors.fullName ? <FormHelperText>{errors.fullName.message}</FormHelperText> : null}
              </FormControl>
         )}
        />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...register('email')} label="Email address" type="email" name='email' onChange={handleInputChange} />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
            <Controller
            control={control}
            name="utype"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>User Type</InputLabel>
                <OutlinedInput  {...register('utype')} label="Role" type="text"  value={data.utype} onChange={handleInputChange}  />
                {errors.utype? <FormHelperText>{errors.utype.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} {...register('password')} label="Password" type="password"  value={data.password} onChange={handleInputChange}  />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
