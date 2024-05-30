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

export interface User {
  _id: string;
  fullName: string;
  utype: string;
  createdAt: Date;
}

export function InactiveUsers(): React.JSX.Element {
  const [users, setUsers] = React.useState<User[]>([]);
  const token = useAppSelector((state) => state.reducers.userReducer.token);
  const loggedIn = useAppSelector((state) => state.reducers.userReducer.loggedIn);

  const getInactiveUsers = async () => {
    try {
      const res = await axios({
        url:"http://localhost:5600/user/getInactiveUsers",
        method:"get",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.users) {
        console.log(res.data.users);
        setUsers(res.data.users);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  const approveUser = async (userId) => {
    try {
      const res = await axios.post(`http://localhost:5600/user/approveUser/${userId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.alert(res.data.msg);
      getInactiveUsers();
      return;
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  useEffect(() => {
    if (loggedIn && token !== "") getInactiveUsers();
  }, [loggedIn]);

  return (
    <Card>
      <CardHeader title="Inactive Users" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow hover key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.utype}</TableCell>
                <TableCell>{dayjs(user.createdAt).format('MMM D, YYYY')}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={() => approveUser(user._id)}
                  >
                    Approve
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
