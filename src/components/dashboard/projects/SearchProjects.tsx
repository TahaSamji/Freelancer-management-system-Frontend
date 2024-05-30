'use client';

import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useState,ChangeEvent,useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { Box } from '@mui/system';
import { Project } from './seller/projects';



export function SearchProjects(): React.JSX.Element {

  const token = useAppSelector((state)=>state.reducers.userReducer.token);


  const [search, setsearch] = useState({
   Search : ""
  });
  const [project, setproject] = useState<Project[]>([]);
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

  const Searchproj = async () => {
  
    try {
      const res = await axios({
        
        url: "http://localhost:5600/project/SearchProjects",
        method: "post",
        data: {Search : search.Search},
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
        }
      });
     
      if (res.status === 200){


        window.alert("yess");
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
     
       <Button onClick={()=>Searchproj()} startIcon={<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
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
            <Card key={projects._id}>
              <h2>{projects.projectName}</h2>
              <p>{projects.projectDescription}</p>
              <p>{projects.projectLength}</p>
             
             </Card>
      
        ))}
    
    </Box>
    </Box>
    
  );
}
