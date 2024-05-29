'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '@/app/Redux/store';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect } from 'react';

function noop(): void {
  // do nothing
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  utype: string;
  createdAt: Date;
}

export function CustomersTable() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const token = useAppSelector((state) => state.reducers.userReducer.token);
  const loggedIn = useAppSelector((state) => state.reducers.userReducer.loggedIn);

  const getAllProfiles = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5600/user/getAllProfiles",
        method: "get",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.users) {
        // Map the _id field to id
        const usersWithId = res.data.users.map(user => ({
          ...user,
          id: user._id,
          createdAt: new Date(user.createdAt)
        }));

        setUsers(usersWithId);
        return;
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const viewProfile = async (userId: string) => {
    try {
      const res = await axios({
        url: `http://localhost:5600/user/viewProfile/${userId}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUsers = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5600/user/deleteUsers/${selectedUsers.join(",")}`,
        method: "post",
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data); // Handle the response as needed
      await getAllProfiles(); // Refresh the user list
      setSelectedUsers([]); // Clear the selected users
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (loggedIn && token !== "") getAllProfiles();
  }, [loggedIn]);

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Full name', width: 160, flex: 1 },
    { field: 'email', headerName: 'Email', width: 200, flex: 1 },
    { field: 'utype', headerName: 'User Type', width: 90, flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Signed Up',
      type: 'date',
      width: 130,
      flex: 1
    },
    {
      field: 'profile',
      headerName: 'Profile',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => viewProfile(params.row.id)}
        >
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedUsers(newSelection as string[]);
        }}
      />
      {selectedUsers.length > 0 && (
        <IconButton onClick={deleteUsers} color="secondary">
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
}
