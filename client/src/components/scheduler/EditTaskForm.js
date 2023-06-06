import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditAllDayTrueDatePicker from './EditAllDayTrueDatePicker';
import EditAllDayFalseDateAndTimePicker from './EditAllDayFalseDateAndTimePicker';

const EditTaskForm = ({ editTask, currentUserTasks, setCurrentUserTasks, tasks, setTasks, currentUserCategories, priorities }) => {

    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState(editTask.title);
    const [editAllDay, setEditAllDay] = useState(editTask.allDay);
    const [editStart, setEditStart] = useState(dayjs(editTask.startStr));
    const [editEnd, setEditEnd] = useState(dayjs(editTask.endStr));
    const [editCategory, setEditCategory] = useState(editTask.extendedProps.category.id);
    const [editPriority, setEditPriority] = useState(editTask.extendedProps.priority.id);
    const [errors, setErrors] = useState([]);

    const displayCategoryMenu = currentUserCategories.map((category) => {
      return(
        <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
      )
    })

    const displayPriorityMenu = priorities.map((eachPriority) => {
      return(
        <MenuItem key={eachPriority.id} value={eachPriority.id}>{eachPriority.order}</MenuItem>
      )
    })

    const handleEditedTask = (editedTask) => {
        const updatedCurrentUserTasks = currentUserTasks.map(task => {
          if(task.id === editedTask.id){
            return editedTask
          } else {
            return task
          }
        })
        setCurrentUserTasks(updatedCurrentUserTasks)

        const updatedTasks = tasks.map(task => {
          if(task.id === editedTask.id){
            return editedTask
          } else {
            return task
          }
        })
        setTasks(updatedTasks)
    }
  
    const handleSubmitEdit = (e) => {
      e.preventDefault();
        fetch(`/tasks/${editTask.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            title: editTitle,
            start: editStart,
            end: editEnd,
            allDay: editAllDay,
            priority_id: editPriority,
            category_id: editCategory
          }),
        })
          .then((r) => {
            if(r.ok){
              r.json().then((editedTask) => {
                handleEditedTask(editedTask)
                navigate('/today')
              })
            }else{
              r.json().then((e) => {
                setErrors(e.errors)
              })
            }
          })
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
                    <Switch checked={editAllDay} onChange={(e) => {setEditAllDay(e.target.checked)}} />} label="All Day"/>
                </FormGroup>
              </Grid>
                { editAllDay ? 
                  <EditAllDayTrueDatePicker 
                    editStart={editStart} 
                    setEditStart={setEditStart} 
                    editEnd={editEnd} 
                    setEditEnd={setEditEnd} 
                  /> : 
                  <EditAllDayFalseDateAndTimePicker 
                    editStart={editStart} 
                    setEditStart={setEditStart} 
                    editEnd={editEnd} 
                    setEditEnd={setEditEnd}
                  /> 
                }
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Choose Category</InputLabel>
                  <Select
                    id="category"
                    value={editCategory}
                    label="Choose Category"
                    onChange={(e) => {setEditCategory(e.target.value)}} >
                      {displayCategoryMenu}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel>Choose Priority</InputLabel>
                  <Select
                    id="priority"
                    value={editPriority}
                    label="Choose Category"
                    onChange={(e) => {setEditPriority(e.target.value)}} >
                      {displayPriorityMenu}
                  </Select>
                </FormControl>
              </Grid>
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