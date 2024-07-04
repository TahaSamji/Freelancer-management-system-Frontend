'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import axios from "axios";

import { useState , useEffect ,ChangeEvent,MouseEvent} from 'react';


import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';


import { paths } from '@/paths';
import { loginUser } from '@/app/Redux/reducer/user';
const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

 

  const [udata, setData] = useState({
    email: "",
    password: "",
    age: 0,
    firstName: "",
    lastName: "",
    admin: false
  });



  useEffect(() => {
    
    console.log(udata);
  }, [udata]);



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = React.useState<boolean>();



  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

 

const loginSubmit = async (event) => {
    try {
      
    if(udata.email === '' || udata.password === ''){
      window.alert("Please enter credentials");
    }
   
  
    router.replace(paths.dashboard.overview);
   
  
      event.preventDefault();
      const res = await axios({
        
        url: "http://localhost:5600/auth/login",
        method: "post",
        data: { email: udata.email ,password:udata.password },
      });
        window.alert(res.data.msg);
      if (res.data.msg === "LOGGED IN"){


        console.log(res.data);
        // getprofile(res.data.token);
        
     
      
      
      
      return; 
    }
      
    } catch (e) {
     
      console.error(e);
    }
  };

  const getprofile = async (token :string) => {
  
    try {
      console.log("getprofile ",token)
      const res = await axios({
        
        url:"http://localhost:5600/user/viewProfile",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

     console.log(res.data);
      if (res.status === 200){

        dispatch(
      
          loginUser({
            userDetails : res.data.user,
            token,
            loggedIn:true
          })
        )
      
        router.replace(paths.dashboard.overview); // Redirect to the dashboard
      return; // Return to prevent further execution
    
    }
      
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };


  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={loginSubmit} >
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" name='email' onChange={handleInputChange} value={udata.email}/>
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  name='password'
                  value={udata.password}
                  onChange={handleInputChange}
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button  type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      {/* <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert> */}
    </Stack>
  );
}
