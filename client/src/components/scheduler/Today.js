import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

const Today = ({ currentUserTasks, setEditTask }) => {

  const navigate = useNavigate();

  const handleEventClick = (eventInfo) => {
    setEditTask(eventInfo.event)
    navigate('/task/edit')
  };

  const handleAddClick = () => {
    navigate('/task/new')
  }

  return (
    <>
      <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: '20px', 
          marginBottom: '20px' 
        }}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={handleAddClick} />
        </Fab>
      </Box>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="timeGridDay"
        events={currentUserTasks}
        eventClick={handleEventClick}
        editable={true}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'timeGridDay,timeGridWeek,dayGridMonth'
        }}
        slotMinTime="05:00:00"
      />
    </>
  )
  }

export default Today