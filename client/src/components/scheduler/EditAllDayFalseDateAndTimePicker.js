import React from 'react';
import Grid from '@mui/material/Grid';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditAllDayFalseDateAndTimePicker = ({ editStart, editEnd, setEditStart, setEditEnd }) => {
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

export default EditAllDayFalseDateAndTimePicker