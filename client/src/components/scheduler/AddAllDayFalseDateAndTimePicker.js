import React from 'react';
import Grid from '@mui/material/Grid';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AddAllDayFalseDateAndTimePicker = ( {addStart, addEnd, setAddStart, setAddEnd }) => {
  return (
    <>
        <Grid item xs={12}>
            <DateTimePicker
              label="Start Date & Time"
              value={addStart}
              onChange={(newStart) => setAddStart(newStart)}
            />
        </Grid>
        <Grid item xs={12}>
            <DateTimePicker
              label="End Date & Time"
              value={addEnd}
              onChange={(newEnd) => setAddEnd(newEnd)}
            />
        </Grid>
    </>
  )
}

export default AddAllDayFalseDateAndTimePicker