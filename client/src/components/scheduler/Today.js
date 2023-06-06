import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

const Today = ({ currentUserTasks, setEditTask }) => {

  const navigate = useNavigate();

  const handleEventClick = (eventInfo) => {
    setEditTask(eventInfo.event)
    navigate(`/tasks/${eventInfo.event.id}/edit`)
  };

  return (
    <div>
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
    </div>
    
  )
  }

export default Today