import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const EditTaskForm = ({ editTask, currentUserTasks, setCurrentUserTasks, tasks, setTasks }) => {

    console.log(editTask.extendedProps)

    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState(editTask.title);
    const [editAllDay, setEditAllDay] = useState(editTask.allDay);
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

    const allDayTrue = () => {
      return (
        <>
        <Grid item xs={12}>
            <DatePicker
              label="Start Date & Time"
              value={editStart}
              onChange={(newStart) => setEditStart(newStart)}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="End Date & Time"
              value={editEnd}
              onChange={(newEnd) => setEditEnd(newEnd)}
            />
          </Grid>
        </>
      )
    }

    const allDayFalse = () => {
      return (
        <>
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
        </>
      )
    }

    const handleCancel = () => {
      const shouldDiscardChanges = window.confirm('Discard changes?');
      if (shouldDiscardChanges) {
      navigate('/today');
      }
    }

    const handleDelete = () => {
      fetch(`/tasks/${editTask.id}`, {
        method:'DELETE'
      })
      .then(res => {
        if(res.ok){
          res.json().then((deletedTask) => {
            const shouldDeleteTask = window.confirm('Delete this task?');
            if (shouldDeleteTask) {
              handleRemoveTask(deletedTask)
              navigate('/today')
            }
          })
        }else{
          res.json().then((e) => {
            setErrors(e.error)
          })
        }
      })
    }

    const handleRemoveTask = (deletedTask) => {
      const removeDeletedTaskFromCurrentUserTasks = currentUserTasks.filter(task => task.id !== deletedTask.id)
        setCurrentUserTasks(removeDeletedTaskFromCurrentUserTasks)
      const filterTasksForDeletedTask = tasks.filter(task => task.id !== deletedTask.id)
        setTasks(filterTasksForDeletedTask)
    }

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
                  onChange={(newTitle) => setEditTitle(newTitle)} 
                  value={editTitle} 
                  label="Title" 
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel control={
                    <Switch checked={editAllDay} onChange={(e) => {setEditAllDay(e.target.checked)}} />} label="All Day?"/>
                </FormGroup>
              </Grid>
                {/* <FormControl fullWidth>
                  <InputLabel>All Day?</InputLabel>
                  <Select
                    id="allDay"
                    value={editAllDay}
                    label="All Day?"
                    onChange={(e) => {setEditAllDay(e.target.value)}} >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl> */}
              { editAllDay ? allDayTrue() : allDayFalse() }
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained">Confirm</Button>
                  <Button variant="contained" color='secondary' onClick={handleCancel}>Cancel</Button>
                  <IconButton aria-label="delete" size="large" onClick={handleDelete}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
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