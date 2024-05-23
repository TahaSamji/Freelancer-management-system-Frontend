// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import {Box} from '@mui/material';
import { useAppSelector } from '@/app/Redux/store';
import { Project } from './projects';
import { useEffect,useState,ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import Select from '@mui/material/Select';
import{ MenuItem} from '@mui/material';

const EditProjectModal = ({open ,handleClose,projData}) => {
    const token  = useAppSelector((state) => state.reducers.userReducer.token);

   console.log(projData._id);

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
   const [data, setData] = useState<Project>(projData);
  
   

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



    const UpdateProject = async () => {
        try {
   
          const res = await axios({
            
            url: `http://localhost:5600/projectManagement/seller/Updateprojects/${data._id}`,
            method: "put",
            data:data,
            headers: {
              Authorization: `Bearer ${token}` // Send token in the Authorization header
            }

    
          });
      
           if(res.data.msg ==="Project Updated successfully"){
            
            window.alert(res.data.msg);
            console.log("update data",res.data.data);
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
          Edit Project
        </Typography>
        <form onSubmit={(event) => { event.preventDefault(); }}>
          <Card>
            <CardHeader subheader="The information can be edited" title="Edit Project" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Project Name</InputLabel>
                    <OutlinedInput defaultValue={data.projectName} label="Project Name" name="projectName" value={data.projectName} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
                <FormControl fullWidth>
                <InputLabel >Project Type</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.projectType} label="Project Type" name="projectType" variant="outlined" value={data.projectType} >
                  {projtype.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel >Skill Level</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.skillLevel} label="Skill Level" name="skillLevel" variant="outlined" value={data.skillLevel} >
                  {skills.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                <FormControl fullWidth>
                <InputLabel >Project Length</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.projectLength} label="Project Length" name="projectLength" variant="outlined" value={data.projectLength} >
                  {lengths.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel >Project Status</InputLabel>
                <Select onChange={handleSelectChange} defaultValue={data.status} label="Project Status" name="status" variant="outlined" value={data.status} >
                  {Allstatus.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Project Price</InputLabel>
                    <OutlinedInput type='Number' defaultValue={data.price} label="Project Price" name="price" value={data.price} onChange={handleInputChange} />
                  </FormControl>
                </Grid>
              
                <Grid md={12} xs={24}>
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
              <Button onClick={UpdateProject} variant="contained">Save details</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;
