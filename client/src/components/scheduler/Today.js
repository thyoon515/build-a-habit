import {useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Today = ({ tasks }) => {

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