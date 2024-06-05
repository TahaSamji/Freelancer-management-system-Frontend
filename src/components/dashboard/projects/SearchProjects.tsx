'use client';

import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useState,ChangeEvent,useEffect } from 'react';
import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { Box } from '@mui/system';
import { Project } from './seller/projects';
import AddBidModal from './freelancer/AddBidModal';
import { ViewProfile } from '../customer/viewprofile';



export function SearchProjects(): React.JSX.Element {

  const token = useAppSelector((state)=>state.reducers.userReducer.token);
  const usertype = useAppSelector((state)=>state.reducers.userReducer.userDetails.utype);
  const [page, setPage] = React.useState(1);

  const [search, setsearch] = useState({
   Search : ""
  });
  const [profile, setprofile] = React.useState<string>("");
  const [project, setproject] = useState<Project[]>([]);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [selectedProject, setSelectedProject] = useState<Project>(); 

  const handleOpen = (proj:Project) => {
    setSelectedProject(proj); 
    setOpen(true); 
  };

  const handleOpen2 = (sellerid:string) => {
    setprofile(sellerid);
    setOpen2(true); 
  };

  
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  useEffect(() => {
    
    console.log(project);
    
  }, [project]);
 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setsearch((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handlepageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    Searchproj(value);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);
  
  const Searchproj = async (page:number) => {
  
    try {
      const res = await axios({
        
        url:`http://localhost:5600/project/SearchProjects?page=${page}`,
        method: "post",
        data: {Search : search.Search},
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
        }
      });
     
      if (res.status === 200){
        setproject(res.data.data);

        

      
      return; // Return to prevent further execution
    
    }
      
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };
  

  return (
    <Box>
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        name="Search"
        fullWidth
        placeholder="Search Projects"
        onChange={handleInputChange}
        value={search.Search}
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
     
       <Button sx={{marginLeft:2}} onClick={()=>Searchproj(page)} startIcon={<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Search
          </Button>
          
    </Card>
    <Box  sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            paddingTop : 5
          }}>
   
    {project.map((projects) => (
            <Card sx={{p:3}} key={projects._id}>
          <Typography variant="h4" color="text.secondary" alignContent={'center'} justifyContent={'center'} >
          {projects.projectName}
              </Typography>
              <p>Task Description: {projects.projectDescription}</p>
              <p>Lenght: {projects.projectLength}</p>
              <p>Price: {`${projects.price}`}</p>
              <p>Type: {projects.projectType}</p>
      <p>
              {usertype == 'Freelancer' && <Button sx={{marginRight:1}} onClick={()=>handleOpen(projects)} variant="contained">
                  Add Bid
                </Button>}
                <Button onClick={()=>handleOpen2(projects.sellerId._id)} variant="contained">
                  View Seller Profile
                </Button>
                </p>
             </Card>
      
        ))}
              {open && <AddBidModal open={open} handleClose={handleClose} projdata={selectedProject} />}
              {open2 && <ViewProfile open={open2} handleClose={handleClose2} userid={profile} />}
    
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' ,marginTop:3}}>
        <Pagination count={10} size="small" page={page}  onChange={handlepageChange} />
      </Box>
    </Box>
    
  );
}
