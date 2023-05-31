import { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CurrentUserContext } from '../../context/CurrentUser';


const Today = ({ tasks }) => {

  const [currentUser] = useContext(CurrentUserContext)
  const [currentuserTasks, setCurrentUserTasks] = useState({})

  
  // const filterCurrentUserTasks = tasks.filter(task => {
  //   if(task.user.id === currentUser.id){
  //     return setCurrentUserTasks(filterCurrentUserTasks)
  //   }
  // })
  
  console.log(currentuserTasks)

  // const eventObjects = tasks.map((task) => ({
  //   title: task.title,
  //   start: new Date(task.start),
  //   end: new Date(task.end),
  //   taskId: task.id
  // }))

  const handleEventClick = (eventInfo) => {
    console.log(eventInfo)
  };

  return (
    <div>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="timeGridDay"
        //events={eventObjects}
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