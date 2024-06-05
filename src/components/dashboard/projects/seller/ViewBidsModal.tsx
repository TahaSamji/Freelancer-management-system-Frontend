// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';

import { useEffect,useState,ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { WindowsLogo } from '@phosphor-icons/react';


export interface Bids {
      _id:string,
      freelancerId:{
        type:object,
        fullName:string,
        email:string,
        _id:string
      };
      bidAmount:string;
      message: string;
    
  }

const ViewBidProjectModal = ({open ,handleClose,projdata}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);

   console.log(projdata._id);
  
   const [data, setData] = useState<Bids[]>([]);
  

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const {name,value} = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    
    console.log("this is Data",data);
  }, [data]);

  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ViewBids = async (projid:string) => {
    try {
   console.log("apii");
      const res = await axios({
        
        url: `http://localhost:5600/project/ShowBidsbyProject/${projid}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
        }


      });
       if(res.status === 200){
        
        setData(res.data.data);
        console.log("update data",res.data.data);
        return;
        
      
       }
        

       }
     catch (e) {
      
      console.error(e);
    }
  };

 
   const Hirefreelancer = async (projid:string,freelancerId:string) => {
    try {
   console.log(projid);
   console.log("free:",freelancerId);
      const res = await axios({
        
        url: `http://localhost:5600/project/HireFreelancer`,
        method: "post",
        data: {freelancerId,ProjectId:projid},
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

  const  handleapi = function (){
    if (open){
     ViewBids(projdata._id);
    }
   }
 
      
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
  };


  return (
    <Modal
      open = {open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Here are the bids for Project {projdata.projectName}
        </Typography>
        <Button onClick={()=>handleapi()  } variant="contained" >Show Bids</Button>
        {data.map((bids) => (
            <Card sx={{p:3}}  key={bids._id}>
             
              <Typography variant="h5" color="text.secondary" alignContent={'center'} justifyContent={'center'} >
              Full Name: {bids.freelancerId.fullName}
              </Typography>
              <p>Email: {bids.freelancerId.email}</p>
              <p>BidAmount: {bids.bidAmount}</p>
              <p>Message: {bids.message} </p>

              <Button onClick={()=>Hirefreelancer(projdata._id,bids.freelancerId._id)} variant="contained">
                  Hire Freelancer
                </Button>
             

              {/* <p>{projects.projectDescription}</p>
              <p>{projects.projectLength}</p>     */}
            </Card>
          ))}
      </Box>
    </Modal>
  );
};

export default ViewBidProjectModal;
