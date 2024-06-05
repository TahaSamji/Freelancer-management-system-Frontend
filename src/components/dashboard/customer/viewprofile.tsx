'use client';
import axios from 'axios';
import { UserDetails } from '../account/account-info';
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
import { SelectChangeEvent } from '@mui/material/Select';
import { UpdateUser } from '@/app/Redux/reducer/user';
import { Box, Modal } from '@mui/material';

const states = [
  { value: 'Online', label: 'Online' },
  { value: 'Offline', label: 'Offline' },

] as const;

export function ViewProfile({open,handleClose,userid}): React.JSX.Element {
    console.log(userid);

  const userDetails:UserDetails  = useAppSelector((state) => state.reducers.userReducer.userDetails);
  
  const token  = useAppSelector((state) => state.reducers.userReducer.token);

  const [data, setData] = useState({
    fullName: "" ,
    email: "",
    position: "",
    linkedAccounts: "",
    description: "",
    skillTags: "",
    portfolio: "",
    availability: ""
    
  });
  const viewProfile = async (userId: string) => {
    try {
      const res = await axios({
        url: `http://localhost:5600/user/ShowProfile/${userId}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.status === 200){
      setData(res.data.user);

     
      
      return;
      }
       // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    viewProfile(userid);
  }, []);

 
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display :'flex',
    padding : '20px'
  };

 

  return (
    <Modal
    open = {open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can not be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl disabled={true} fullWidth required>
                <InputLabel>Full Name</InputLabel>
                <OutlinedInput defaultValue={data.fullName} label="First name" name="fullName" value={data.fullName}
                 />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
            <FormControl disabled={true} fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue={userDetails.email} label="Email address" name="email" value={data.email} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
            <FormControl disabled={true} fullWidth>
                <InputLabel>Position</InputLabel>
                <OutlinedInput label="Position" name="position" type="text" defaultValue={data.position} value={data.position}  />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
            <FormControl disabled={true} fullWidth>
                <InputLabel >Availability</InputLabel>
                <Select disabled={true} defaultValue={data.availability} label="Availablity" name="availability" variant="outlined" value={data.availability} >
                  {states.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={12} xs={24}>
            <FormControl disabled={true} fullWidth>
                <InputLabel>Description</InputLabel>
                <OutlinedInput label="Description" name="description" type="text" defaultValue={data.description} value={data.description}/>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
    </Box>
    </Modal>
  );
}
