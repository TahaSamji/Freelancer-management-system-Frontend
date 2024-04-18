'use client';
import axios from 'axios';
import { UserDetails } from './account-info';
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from '@/app/Redux/store';
import { useDispatch } from 'react-redux';
import { useState ,useEffect,ChangeEvent} from 'react';
import { Console } from 'console';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

export function AccountDetailsForm(): React.JSX.Element {

  const userDetails:UserDetails  = useAppSelector((state) => state.reducers.userReducer.userDetails);
  
  const token  = useAppSelector((state) => state.reducers.userReducer.token);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullName: userDetails.fullName ,
    email: userDetails.email,
    position: userDetails.position,
    linkedAccounts: userDetails.linkedAccounts,
    description: userDetails.description,
    skillTags: userDetails.skillTags,
    portfolio: userDetails.portfolio,
    
  });
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
  const  UpdateProfile = async (event: React.FormEvent) =>{
  try {

    event.preventDefault();

    const res = await axios({
        
      url: "http://localhost:5600/user/editProfile",
      method: "post",
      data: data,
      headers: {
        Authorization: `Bearer ${token}` // Send token in the Authorization header
      }
    
      
    });
   window.alert(res.data.msg);
    if (res.data.msg){
      console.log("success");
    }  
  } catch (error) {
    
  }
}



  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Full Name</InputLabel>
                <OutlinedInput defaultValue="Sofia" label="First name" name="fullName" value={data.fullName}
                 onChange={handleInputChange}  />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput defaultValue="Rivers" label="Last name" name="lastName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue={userDetails.email} label="Email address" name="email" value={data.email} onChange={handleInputChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select defaultValue="New York" label="State" name="state" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput label="City" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={UpdateProfile} variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
