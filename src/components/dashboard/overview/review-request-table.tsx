"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAppSelector } from '@/app/Redux/store';
import { useEffect } from 'react';

export interface notifications {
  _id: string;
  ProjectId:{
    type:object
    projectName:string;
  };
  freelancerId:{
    type:object
    fullName:string;
  };
  message: string;
  ntype: string;
  createdAt: Date;
}

export function ReviewRequests(): React.JSX.Element {

  const token = useAppSelector((state) => state.reducers.userReducer.token);
  const loggedIn = useAppSelector((state) => state.reducers.userReducer.loggedIn);
  const [notifications,setNotifications] = React.useState<notifications[]>([]);
  

 
  const ShowRequests = async () => {
    try {
  
      const res = await axios({
        
        url: `http://localhost:5600/project/ShowReviewRequests`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
        }


      });
     
       if(res.status === 200){
        console.log("noti",res.data.data);
        setNotifications(res.data.data);
       
        return;  
       }
       }
     catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };
  const approveUser = async (userId) => {
    try {
      const res = await axios.post(`http://localhost:5600/user/approveUser/${userId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.alert(res.data.msg);
     
      return;
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  useEffect(() => {

    
   ShowRequests();
  }, []);
  useEffect(() => {
    // setnotifications(notification);

    console.log(notifications);
  }, [notifications]);

  return (
    <Card>
      <CardHeader title="Pending Review Requests" subheader="You can Mark these Projects Completed" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Freelancer Name</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Accept?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow hover key={notification._id}>
                <TableCell>{notification.freelancerId.fullName}</TableCell>
                <TableCell>{notification.ProjectId.projectName}</TableCell>
                <TableCell>{notification.message}</TableCell>
                {/* <TableCell>{dayjs(notification.createdAt).format('MMM D, YYYY')}</TableCell> */}
                <TableCell>
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    // onClick={() => approveUser(user._id)}
                  >
                    Approve and mark Completed
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
