import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EditTask from './EditTask';
import { useNavigate } from 'react-router-dom';

const Today = ({ currentUserTasks }) => {

  // const eventObjects = currentUserTasks.map((task) => ({
  //   title: task.title,
  //   start: new Date(task.start),
  //   end: new Date(task.end),
  //   taskId: task.id
  // }))
  const navigate = useNavigate();

  const handleEventClick = (eventInfo) => {
    <EditTask task={eventInfo}/>
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
      />
    </div>
    
  )
  }

export default Today