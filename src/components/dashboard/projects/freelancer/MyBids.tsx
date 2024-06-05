'use client';

import axios from "axios";
import { Box } from "@mui/system";
import {Button, Tab, Tabs} from "@mui/material";
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Card,Grid } from "@mui/material";
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import {Typography} from "@mui/material";
import React, { ChangeEvent } from "react";
import EditBidModal from "./EditBid";


import { useState,useEffect } from "react";
import { useAppSelector } from "@/app/Redux/store";
import { WindowsLogo } from "@phosphor-icons/react";



 
export interface Project {
    _id: string;
    sellerId:{
      type:object;
      fullName:string;
      _id:string;
      description:string;
    };
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

  export interface Projectbid {
    _id: string;
    sellerId:string;
    projectName: string;
    bids:[{
      freelancerId:string;
      bidAmount:string;
      message: string;
      _id:string;
    }]
  }
  

export function Bids(): React.JSX.Element {
    const [project, setproject] = useState<Project[]>([]);
    const [myBids, setBids] = useState<Projectbid[]>([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [status, setStatus] = useState<string>("bids");
   
  
    const [selectedProject, setSelectedProject] = useState<Projectbid>(); 

    const handleOpen = (proj:Projectbid) => {
      setSelectedProject(proj); 
      setOpen(true); 
    };
  
    
    const handleOpen2 = () => {

      setOpen2(true); 
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
      
      setStatus(newValue);
      if(newValue === 'bids'){
      ShowBids();
      }else{
      Showmyprojbids(newValue);
      }

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

   
    const SendReviewRequest = async (projid:string) => {
      try {
  
        const res = await axios({
          
          url: "http://localhost:5600/project/Reviewrequest",
          method: "post",
          data: {ProjectId:projid},
          headers: {
            Authorization: `Bearer ${token}` // Send token in the Authorization header
          }
  
        });
    window.alert(res.data.msg);
         if(res.status === 200){
          
          window.alert(res.data.msg);
          return;
        
         }
  
         }
       catch (e) {
        
        console.error(e);
      }
    };



 const Showmyprojbids = async (type:string) => {
      try {
  
        const res = await axios({
          
          url: `http://localhost:5600/project/Showmyongoingproj/${type}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

         if(res.status === 200){
       
          setproject(res.data.data);
         
          console.log("data",res.data.data);
          
          }
          return;
         }
       catch (e) {
        window.alert("ERROR");
        console.error(e);
      }
    };

    const WithdrawBid = async (projid:string) => {
      try {
   
        const res = await axios({
          
          url: "http://localhost:5600/project/WithdrawBid",
          method: "post",
          data: {ProjectId:projid},
          headers: {
            Authorization: `Bearer ${token}` // Send token in the Authorization header
          }
  
        });
    
         if(res.status === 200){
          
          window.alert(res.data.msg);
          return;
        
         }
  
         }
       catch (e) {
        console.error(e);
      }
    };



  
    const ShowBids = async () => {
      try {
  
        const res = await axios({
          
          url: `http://localhost:5600/project/ShowMyBids`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

         if(res.status === 200){
       
          setBids(res.data.data);
         
    
          
          }
          return;
         }
       catch (e) {
       
        console.error(e);
      }
    };

  
    useEffect(() => {
      
      ShowBids();

      
      
    }, []);
    useEffect(() => {
      
      ShowBids();

    }, [open]);
   
    useEffect(() => {
      
      console.log("myproj",project)

      
    }, [project]);
   


    return (
      <Box>
            <dl></dl>
               <Box>
        <Tabs
        value={status}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="bids" label="Bidded Projects" />
        <Tab value="pending" label="OnGoing" />
        <Tab value="completed" label="Completed" />
      </Tabs>
               </Box>
       {status==='bids' && <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            paddingTop:6
          
          }}
        >
          {myBids.map((bid) => (
            <Card sx={{p:3}} key={bid.bids[0]._id}>
              <Typography variant="h4" color="text.secondary" alignContent={'center'} justifyContent={'center'} >
              {bid.projectName}
              </Typography>
              <p>Proposal: {bid.bids[0].message}</p>
              <p>Bid Amount: {bid.bids[0].bidAmount}</p>
              <p>

                <Button sx={{marginRight:1}} onClick={()=>handleOpen(bid)} variant="contained">
                  Edit Bid
                </Button>
                
                <Button onClick={()=>WithdrawBid(bid._id)} variant="contained">
                  Withdraw Bid
                </Button>
              
                </p>
            </Card>
          ))}
          {open && <EditBidModal open={open} handleClose={handleClose} projdata={selectedProject} />}
          
        </Box>}
        {status!=='bids' && <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            paddingTop:6
          
          }}
        >
          {project.map((proj) => (
            <Card sx={{p:3}} key={proj._id}>
              <Typography variant="h4" color="text.secondary" alignContent={'center'} justifyContent={'center'} >
              {proj.projectName}
              </Typography>
              <p>Seller Name: {proj.sellerId.fullName}</p>
              <p>Task Description: {proj.projectDescription}</p>
              {status === 'completed' && <p>Review: {`${proj.review}`}</p>}
              {status === 'completed' && <p>Rating: {`${proj.rating}`}</p>}


              <p>

               {status === 'pending'&&<Button onClick={()=>SendReviewRequest(proj._id)} variant="contained">
               Send Review Request
              </Button>}
              </p>
            </Card>
          ))}
          {/* {open && <EditProjectModal open={open} handleClose={handleClose} projData={selectedProject} />}
          {open2 && <AddProject open={open2} handleClose={handleClose2} />} */}
        </Box>}
      </Box>
    );
  }
   
