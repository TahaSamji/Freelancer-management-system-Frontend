// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { useEffect,useState,ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import Select from '@mui/material/Select';
import{ MenuItem} from '@mui/material';

const AddProject = ({open ,handleClose}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);



   const lengths = [
    { value: "< 1 month", label: "< 1 month" },
    { value:  "1-3 months", label: "1-3 months" },
    { value: "> 3 months", label: "> 3 months" },
  
  ] as const;

  const projtype = [
    { value: "Fixed Price", label:"Fixed Price" },
    { value:  "Hourly", label: "Hourly" },
  
  ] as const;
  const skills = [
    { value: "Entry Level", label:"Entry Level" },
    { value: "Intermediate", label:  "Intermediate" },
    { value:  "Expert", label:"Expert" }
  ] as const;

  const Allstatus = [
    { value: "notHired", label:"notHired" },
    { value:  "pending", label:  "pending"  },
    { value:   "completed", label:"completed" }
  ] as const;
   const [data, setData] = useState({
   
    projectName : "",
    projectDescription: "",
    projectLength: "",
    projectType: "",
    skillTags:[""],
    skillLevel: "",
    price :   0
   });
  
   

  // const handleSelectChange = (event: SelectChangeEvent<string>) => {
  //   const projectLength = event.target.value as string;
  //   setData((prevData) => ({
  //     ...prevData,
  //     projectLength: projectLength,
  //   }));
  // };

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



    const AddProject = async () => {
        try {
   
          const res = await axios({
            
            url: "http://localhost:5600/projectManagement/seller/addproject",
            method: "post",
            data:data,
            headers: {
              Authorization: `Bearer ${token}` // Send token in the Authorization header
            }

    
          });
      
           if(res.data.msg ==="Project created successfully"){
            
            window.alert(res.data.msg);
            handleClose();
            console.log(" data",res.data.data);
            return;
            
          
           }
            
    
           }
         catch (e) {
          window.alert("ERROR");
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
            <CardHeader subheader="The information can be edited" title="Add Project" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Project Name</InputLabel>
                    <OutlinedInput defaultValue={data.projectName} label="Project Name" name="projectName" value={data.projectName} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
                <FormControl sx={{marginTop:1}} fullWidth>
                <InputLabel >Project Type</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.projectType} label="Project Type" name="projectType" variant="outlined" value={data.projectType} >
                  {projtype.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{marginTop:1}} fullWidth>
                <InputLabel >Skill Level</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.skillLevel} label="Skill Level" name="skillLevel" variant="outlined" value={data.skillLevel} >
                  {skills.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                <FormControl  sx={{marginTop:1}} fullWidth>
                <InputLabel >Project Length</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.projectLength} label="Project Length" name="projectLength" variant="outlined" value={data.projectLength} >
                  {lengths.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid sx={{marginTop:1}} md={6} xs={12}>
                  <FormControl fullWidth   required>
                    <InputLabel>Project Price</InputLabel>
                    <OutlinedInput type='Number' defaultValue={data.price} label="Project Price" name="price" value={data.price} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
              
                <Grid sx={{marginTop:1}}  md={12} xs={24}>
                  <FormControl fullWidth>
                    <InputLabel>Project Description</InputLabel>
                    <OutlinedInput label="Description" name="projectDescription" type="text" defaultValue={data.projectDescription} 
                    value={data.projectDescription} onChange={handleInputChange}/>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={AddProject} variant="contained"> Create Project</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProject;
