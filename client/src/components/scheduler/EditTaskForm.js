import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';

const EditTaskForm = ({ editTask }) => {

    console.log(editTask.startStr)

    const navigate = useNavigate();

    const [editTaskFormData, setEditTaskFormData] = useState({
      title: editTask.title,
      end: editTask.end,
      allDay: editTask.allDay
    });
    const [editStart, setEditStart] = useState(dayjs(editTask.startStr));
    const [editEnd, setEditEnd] = useState(dayjs(editTask.endStr));
    const [errors, setErrors] = useState([]);

    const handleEditedItem = (editedItem) => {
    //   const updatedCurrentUserItems = currentUser.items.map(item => {
    //     if(item.id === editedItem.id){
    //       return editedItem
    //     } else {
    //       return item
    //     }
    //   })
    //   currentUser.items = updatedCurrentUserItems
    //   const updatedItems = items.map(item => {
    //     if(item.id === editedItem.id){
    //       return editedItem
    //     } else {
    //       return item
    //     }
    //   })
    //   setItems(updatedItems)
    }
  
    const handleSubmitEdit = (e) => {
      e.preventDefault();
    //   fetch(`/items/${editItem.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       title: editTaskFormData.title,
    //       image: editTaskFormData.image,
    //       price: editTaskFormData.price,
    //       description: editTaskFormData.description,
    //       location_id: editSelectLocation
    //     }),
    //   })
    //     .then((r) => {
    //       if(r.ok){
    //         r.json().then((editedItem) =>{
    //             handleEditedItem(editedItem)
    //             navigate(`/users/${currentUser.id}/items`)
    //         })
    //     }else{
    //         r.json().then((e) => {
    //           setErrors(e.errors)
    //         })
    //     }
    //   })
    }
  
    const handleEditChange = (e) => {
      const key = e.target.id
      setEditTaskFormData({
        ...editTaskFormData,
        [key]: e.target.value
      })
    }

    // const handleChangeLocation = (e) => {
    //   setEditSelectLocation(e.target.value)
    // }

    // const displayLocation = locations.map((location) => {
    //   return (
    //     <MenuItem key={location.id} value={location.id}>{location.nyc_borough_name}</MenuItem>
    //   )
    // })

  return (
    <form onSubmit={handleSubmitEdit}>
        <Container maxWidth="sm">
          <Box sx={{ m: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="title" 
                  onChange={handleEditChange} 
                  value={editTaskFormData.title} 
                  label="Title" 
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  label="Start Date & Time"
                  value={editStart}
                  onChange={(newStart) => setEditStart(newStart)}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  label="End Date & Time"
                  value={editEnd}
                  onChange={(newEnd) => setEditEnd(newEnd)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="allDay" 
                  onChange={handleEditChange} 
                  value={editTaskFormData.allDay} 
                  label="All Day?" 
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select NYC Borough</InputLabel>
                  <Select
                    id="selectLocation"
                    value={editSelectLocation}
                    label="Select NYC Borough"
                    onChange={handleChangeLocation} >
                      {displayLocation}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained">Edit Task</Button>
                <div>
                  {errors && (
                  <ul style={{ color: "red" }}>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
  </form>
  )
}

export default EditTaskForm