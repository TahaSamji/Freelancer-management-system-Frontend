// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { useEffect,useState,ChangeEvent } from 'react';
import { Projectbid } from './MyBids';


const EditBidModal = ({open ,handleClose,projdata}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);

   console.log(projdata);
  

   const [data, setData] = useState<Projectbid>(projdata);
   const [updatedbid, setBid] = useState({
    bidAmount:projdata.bids[0].bidAmount,
    message: projdata.bids[0].message,
    ProjectId : projdata._id
   });
  

  useEffect(() => {
    
    console.log("this is Data",data);
  }, [data]);
  useEffect(() => {
    
    console.log("this is updated bid",updatedbid);
  }, [updatedbid]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBid((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



    const UpdateBid = async () => {
        try {
   
          const res = await axios({
            
            url: `http://localhost:5600/project/EditMyBid`,
            method: "post",
            data:updatedbid,
            headers: {
              Authorization: `Bearer ${token}` // Send token in the Authorization header
            }

    
          });
      
           if(res.status === 200){
            
            window.alert(res.data.msg);
            handleClose();
            console.log("update data",res.data.data);
            return;
            
          
           }
            
    
           }
         catch (e) {
          
          console.error(e);
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
          <Card>
            <CardHeader subheader="You Can Edit your Bid here" title="Edit Bid" />
            <Divider />
            <CardContent>
                <Grid>

              <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Bid Amount</InputLabel>
                    <OutlinedInput type='Number' defaultValue={updatedbid.bidAmount} label="bidAmount" name="bidAmount" value={updatedbid.bidAmount} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
              
                <Grid sx={{marginTop:1}} md={12} xs={24}>
                  <FormControl fullWidth>
                    <InputLabel>Message</InputLabel>
                    <OutlinedInput label="Message" name="message" type="text" defaultValue={updatedbid.message}  
                    value={updatedbid.message} onChange={handleInputChange}/>
                  </FormControl> 
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={UpdateBid} variant="contained">Save Bid details</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default EditBidModal;
