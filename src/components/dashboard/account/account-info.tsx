'use client';

import { useAppSelector } from '@/app/Redux/store';

import axios from 'axios';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



export interface UserDetails {
  fullName?: string,
  email?: string,
  position?: string,
  linkedAccounts?: string,
  description?: string,
  skillTags?: [string],
  portfolio?: [{}],
  availability? : string,
  utype ?: string

  // Add other properties if needed
};



export function AccountInfo(): React.JSX.Element {


  const userDetails : UserDetails = useAppSelector((state) => state.reducers.userReducer.userDetails);
 

  const user = {
    name: userDetails.fullName,
    avatar: '/assets/Muhammad_Taha_Samji.jpeg.jpg',
    jobTitle: userDetails.position,
    email :userDetails.email,
    description:userDetails.description,
    availability : userDetails.availability


  } as const;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
            Email: {user.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
            Position: {user.jobTitle}
            </Typography>
            <Typography color="text.secondary" variant="body2">
            Availability: {user.availability}
            </Typography>
            <Typography color="text.secondary" variant="body2">
            Description: {user.description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
