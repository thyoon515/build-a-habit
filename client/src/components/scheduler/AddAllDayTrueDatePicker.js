import React from 'react';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddAllDayTrueDatePicker = ({ addStart, addEnd, setAddStart, setAddEnd }) => {
    
  return (
    <>
        <Grid item xs={12}>
            <DatePicker
                label="Start Date"
                value={addStart}
                onChange={(newStart) => setAddStart(newStart)}
            />
        </Grid>
        <Grid item xs={12}>
            <DatePicker
                label="End Date"
                value={addEnd}
                onChange={(newEnd) => setAddEnd(newEnd)}
            />
        </Grid>
    </>
  )
}

export default AddAllDayTrueDatePicker