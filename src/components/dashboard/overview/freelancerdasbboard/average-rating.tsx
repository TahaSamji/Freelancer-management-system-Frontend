'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import axios from 'axios';
import { useAppSelector } from '@/app/Redux/store';






export function AverageRating({ sx }): React.JSX.Element {
  // const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  // const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';
  const [value,setvalue] = React.useState(0);

const token = useAppSelector((state) => state.reducers.userReducer.token);

React.useEffect(() => {

    
  ShowAverageRating();
 }, []);

  const ShowAverageRating = async () => {
    try {
  
      const res = await axios({
        
        url: `http://localhost:5600/rating/freelancer-average-rating`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
        }


      });
     
       if(res.status === 200){
        setvalue(res.data.averageRating);
      
       
        return;  
       }
       }
     catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                My Average Rating
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              <UsersIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
         
        </Stack>
      </CardContent>
    </Card>
  );
}
