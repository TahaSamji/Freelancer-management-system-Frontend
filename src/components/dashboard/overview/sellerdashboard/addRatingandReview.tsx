// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { useEffect,useState,ChangeEvent } from 'react';


const RemarksModal = ({open ,handleClose,projid}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);
    let error = "";


    const [data, setdata] = useState({
      ProjectId :projid,
     rating:0,
      review: "",
     });

  useEffect(() => {
    
    console.log("this is Data",data);
  }, [data]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



    const AddRemarks = async () => {
        try {

          
   
          const res = await axios({
            
            url: "http://localhost:5600/rating/GiveRatingReview",
            method: "post",
            data:data,
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
            <CardHeader subheader="Please Enter Review and Rating for freelancer" title="Remarks" />
            <Divider />
            <CardContent>
      
              <Grid>
                  <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Project Rating </InputLabel>
                    <OutlinedInput type='Number' defaultValue={data.rating} label="Rating" name="rating" value={data.rating} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
              
                <Grid  sx={{marginTop:1}} md={12} xs={24}>
                  <FormControl fullWidth>
                    <InputLabel>Review</InputLabel>
                    <OutlinedInput label="Revire" name="review" type="text" defaultValue={data.review} 
                    value={data.review} onChange={handleInputChange}/>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={AddRemarks} variant="contained"> Post Remarks</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default RemarksModal;
