'use client';

import axios from "axios";
import { Box } from "@mui/system";
import {Button, Tab, Tabs} from "@mui/material";
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Card,Grid } from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import {Typography} from "@mui/material";
import React, { ChangeEvent } from "react";
import EditProjectModal from "./ProjectModal";


import { useState,useEffect } from "react";
import { useAppSelector } from "@/app/Redux/store";
import { WindowsLogo } from "@phosphor-icons/react";
import AddProject from "./AddProjModal";


 
export interface Project {
    _id: string;
    sellerId:string;
    projectName: string;
    projectDescription: string;
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

  

export function Projects(): React.JSX.Element {
    const [project, setproject] = useState<Project[]>([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [status, setStatus] = useState<string>("notHired");
   
  
    const [selectedProject, setSelectedProject] = useState<Project>(); 

    const handleOpen = (projid:Project) => {
      setSelectedProject(projid); 
      setOpen(true); 
    };
  
    
    const handleOpen2 = () => {

      setOpen2(true); 
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
      
      setStatus(newValue);
      ShowProjects(newValue);

    };
    
   
    const handleClose = () => setOpen(false);
    
    const handleClose2 = () => setOpen2(false);
  
 
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const token  = useAppSelector((state) => state.reducers.userReducer.token);

    
    const DeleteProject = async (projid) => {
      try {
 
        const res = await axios({
          
          url: `http://localhost:5600/projectManagement/seller/DeleteProject/${projid}`,
          method: "post",
          headers: {
            Authorization: `Bearer ${token}` // Send token in the Authorization header
          }
  
        });
    
         if(res.data.msg ==="Project deleted successfully"){
          
          window.alert(res.data.msg);
          return;
        
         }
  
         }
       catch (e) {
        window.alert("ERROR");
        console.error(e);
      }
    };

  
    const ShowProjects = async (status:String) => {
      try {
  
        const res = await axios({
          
          url: `http://localhost:5600/project/ShowMyProjects/${status}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
    
         if(res.status === 200){
          
          setproject(res.data.data);
          console.log(res.data.data);
          }
          return;
         }
       catch (e) {
        window.alert("ERROR");
        console.error(e);
      }
    };

  
    useEffect(() => {
      
      ShowProjects(status);
    
      
    }, []);
   


    return (
      <Box>
        <dl></dl>
        <Button onClick={handleOpen2} variant="contained">
                  Add Project
        </Button>
            <dl></dl>
               
               <Box>
        <Tabs
        value={status}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="notHired" label="Nothired" />
        <Tab value="pending" label="Pending" />
        <Tab value="completed" label="Completed" />
      </Tabs>
               </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)'
          }}
        >
          {project.map((projects) => (
            <Card key={projects._id}>
              <h2>{projects.projectName}</h2>
              <p>{projects.projectDescription}</p>
              <p>{projects.projectLength}</p>
              <p>

                <Button onClick={()=>handleOpen(projects)} variant="contained">
                  Edit Project
                </Button>
               

                <Button onClick={()=>DeleteProject(projects._id)} variant="contained">
                  Delete Project
                </Button>
              </p>
            </Card>
          ))}
          {open && <EditProjectModal open={open} handleClose={handleClose} projData={selectedProject} />}
          {open2 && <AddProject open={open2} handleClose={handleClose2} />}
        </Box>
      </Box>
    );
  }
   