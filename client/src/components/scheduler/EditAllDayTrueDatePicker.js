import React from 'react';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditAllDayTrueDatePicker = ({ editStart, editEnd, setEditStart, setEditEnd }) => {
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

export default EditAllDayTrueDatePicker