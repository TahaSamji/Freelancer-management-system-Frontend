'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAppSelector } from '@/app/Redux/store';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';


export interface Project {
  _id: string;
  sellerId:string;
  projectName: string;
  projectDescription: string;
  freelancerId:{
    _id:string;
    fullName:string;
    description:string;
  };
  projectLength: string;
  projectType: string;
  skillTags:[string];
  skillLevel: string ;
  status : string;
  price :   Number;
  rating:Number;
  review:String;
  bids:[{
    freelancerId:string;
    bidAmount:string;
    message: string;
  }]
}







export function CompletedProjects({ sx }): React.JSX.Element {
  const token  = useAppSelector((state) => state.reducers.userReducer.token);
  const [projects, setproject] = useState<Project[]>([]);

  useEffect(() => {
    
   ShowProjects();
   console.log(projects);
  }, [projects]);

  const ShowProjects = async () => {
    try {

      const res = await axios({
        
        url: `http://localhost:5600/project/Showmyongoingproj/completed`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
       if(res.status === 200){
        console.log(res.data.data);
        setproject(res.data.data);
        
        }
        return;
       }
     catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader title="Completed Projects and Remarks Given" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Rating</TableCell>
 
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow hover key={project._id}>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.review}</TableCell>
                <TableCell> {`${project.rating}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
