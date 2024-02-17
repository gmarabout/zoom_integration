import { FC, Fragment, useState, useMemo } from 'react'
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Calendar, Views, momentLocalizer, SlotInfo } from 'react-big-calendar'
import './App.css';

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr-FR");
const localizer = momentLocalizer(moment);

const App: FC = () => {
  const [events, setEvents] = useState([])

  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSelect = (slotInfo: SlotInfo) => {
    setEvent({
      start: moment(slotInfo.start).format("YYYY-MM-DD HH-mm"),
      end: moment(slotInfo.end).format("YYYY-MM-DD HH-mm"),
      title: "",
    })
    handleShow()
  }
    
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )
  
  const handleValidate = () => {
    console.log("Validated!");
  }


  return (
    <Fragment>
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          onSelectSlot={handleSelect}
          scrollToTime={scrollToTime}
          selectable
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book a Zoom meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are booking a meeting from {event.start} to {event.end}</p>
          <InputGroup>
        <InputGroup.Text>Title</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      </Fragment>
  )
}

export default App;
