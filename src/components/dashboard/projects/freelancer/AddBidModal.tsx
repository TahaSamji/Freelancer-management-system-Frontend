// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { useEffect,useState,ChangeEvent } from 'react';


const AddBidModal = ({open ,handleClose,projdata}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);

    

    const [biddata, setBid] = useState({
      projectId :projdata._id,
      bidAmount:0,
      message: "",
     });

  useEffect(() => {
    
    console.log("this is Data",biddata);
    // setBid({message:biddata.message,bidAmount:biddata.bidAmount,projectId:projdata._id});

  }, [biddata]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBid((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



    const AddBid = async () => {
        try {

          
   
          const res = await axios({
            
            url: "http://localhost:5600/project/Projectbid",
            method: "post",
            data:{bidAmount:biddata.bidAmount,message:biddata.message,projectId:biddata.projectId},
            headers: {
              Authorization: `Bearer ${token}` // Send token in the Authorization header
            }

    
          });
     
           if(res.status === 200){
            
            window.alert(res.data.msg);
            
            console.log(" data",res.data.data);
            handleClose();
            return;
            
          
           }
           
            
           }
         catch (e) {
          window.alert("You already have a bid on this Project , Please Edit your Bid in the Bids Menu");
          console.error(e);
          handleClose();
        }
      };
   
      
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
      
        <form onSubmit={(event) => { event.preventDefault(); }}>
          <Card >
            <CardHeader subheader="Please Add Bid Details here" title="Add Bid" />
            <Divider />
            <CardContent>
      
              <Grid>
                  <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Project Bid</InputLabel>
                    <OutlinedInput type='Number' defaultValue={biddata.bidAmount} label="Project Bid" name="bidAmount" value={biddata.bidAmount} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
              
                <Grid  sx={{marginTop:1}} md={12} xs={24}>
                  <FormControl fullWidth>
                    <InputLabel>Message</InputLabel>
                    <OutlinedInput label="Description" name="message" type="text" defaultValue={biddata.message} 
                    value={biddata.message} onChange={handleInputChange}/>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={AddBid} variant="contained"> Add Bid</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default AddBidModal;
