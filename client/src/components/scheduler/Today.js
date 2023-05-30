import {useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Today = () => {

  const tasks = [
    {title: 'Walk the dogs', start: '2023-05-30T07:45', end: '2023-05-30T08:45'},
    {title: 'Work out', start: '2023-05-30T08:45', end: '2023-05-30T09:45'},
    {title: 'Eat', start: '2023-05-30T10:00', end: '2023-05-30T11:00'}
  ]

  const [openModal, setOpenModal] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Add Task</button>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="timeGridDay"
        events={tasks} 

      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <p>open</p>
        </Box>
      </Modal>
    </div>
    
  )
}

export default Today