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
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddAllDayTrueDatePicker from './AddAllDayTrueDatePicker';
import AddAllDayFalseDateAndTimePicker from './AddAllDayFalseDateAndTimePicker';

const AddTaskForm = ({
  currentUserTasks, 
  setCurrentUserTasks, 
  tasks, 
  setTasks, 
  currentUserCategories, 
  priorities 
}) => {

  const navigate = useNavigate();
  const [addTitle, setAddTitle] = useState('');
  const [isItAllDay, setIsItAllDay] = useState(false);
  const [addStart, setAddStart] = useState(dayjs());
  const [addEnd, setAddEnd] = useState(dayjs());
  const [selectCategory, setSelectCategory] = useState('');
  const [selectPriority, setSelectPriority] = useState('');
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

  const handleAddTask = (addNewTask) => {
    // const updatedCurrentUserItems = [...currentUser.items, postNewItem]
    // currentUser.items = updatedCurrentUserItems
    // const updatedItems = [...items, postNewItem]
    // setItems(updatedItems)
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // fetch('/items', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: addItemFormData.title,
    //     image: addItemFormData.image,
    //     price: addItemFormData.price,
    //     description: addItemFormData.description,
    //     location_id: selectLocation
    //   }),
    // })
    //   .then((r) => {
    //     if(r.ok){
    //       r.json().then((postNewItem) =>{
    //         handleAddItem(postNewItem)
    //         navigate(`/users/${currentUser.id}/items`)
    //     })
    //   }else{
    //       r.json().then((e) => {
    //         setErrors(e.errors)
    //       })
    //   }
    // })
    // setAddItemFormData({
    //   title: "",
    //   image: "",
    //   price: "",
    //   description: ""
    // })
  }

  const handleAddCancel = () => {
    const shouldDiscard = window.confirm('Discard?');
    if (shouldDiscard) {
    navigate('/today');
    }
  }

  return (
    <form onSubmit={handleTaskSubmit}>
        <Container maxWidth="sm">
          <Box sx={{ m: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="title" 
                  onChange={(inputTitle) => setAddTitle(inputTitle)} 
                  value={addTitle}
                  label="Title" 
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel control={
                    <Switch checked={isItAllDay} onChange={(e) => {setIsItAllDay(e.target.checked)}} />} label="All Day"/>
                </FormGroup>
              </Grid>
                { isItAllDay ? 
                  <AddAllDayTrueDatePicker
                    addStart={addStart} 
                    setAddStart={setAddStart} 
                    addEnd={addEnd} 
                    setAddEnd={setAddEnd} 
                  /> : 
                  <AddAllDayFalseDateAndTimePicker
                    addStart={addStart} 
                    setAddStart={setAddStart} 
                    addEnd={addEnd} 
                    setAddEnd={setAddEnd}
                  /> 
                }
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Choose Category</InputLabel>
                  <Select
                    id="category"
                    value={selectCategory}
                    label="Choose Category"
                    onChange={(e) => {setSelectCategory(e.target.value)}} >
                      {displayCategoryMenu}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Choose Priority</InputLabel>
                  <Select
                    id="priority"
                    value={selectPriority}
                    label="Choose Category"
                    onChange={(e) => {setSelectPriority(e.target.value)}} >
                      {displayPriorityMenu}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained">Add</Button>
                  <Button variant="contained" color='secondary' onClick={handleAddCancel}>Cancel</Button>
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

export default AddTaskForm