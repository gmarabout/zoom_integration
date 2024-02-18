import { FC, Fragment, useState, useEffect, useMemo, useCallback } from 'react'
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


interface Meeting {
  id?: number;
  topic: string;
  start_time: Date;
  duration: number;
}

interface Event {
  title: string;
  start: Date;
  end: Date;
}


const meetingToEvent = (meeting: Meeting): Event => {
  return {
    start: new Date(meeting.start_time),
    end: moment(new Date(meeting.start_time)).add(meeting.duration, "m").toDate(),
    title: meeting.topic
  }
}

const eventToMeeting = (event: Event): Meeting => {
  return {
    start_time: event.start,
    topic: event.title,
    duration: (event.end.getTime() - event.start.getTime()) / 1000 / 60
  }
}

const App: FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  // Fetch existing events
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch("http://localhost:9000/api/zoom/meetings")
      ).json();

      setEvents(data.meetings.map(meetingToEvent));
    };
    dataFetch();
  }, []);

  const [appointment, setAppointment] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date() 
  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const start = slotInfo.start
    const end = slotInfo.end
    setAppointment({ "start": start, "end": end, "title": "New Event" })
    handleShow()
  }


  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  )

  const handleValidate = async () => {
    handleClose()
    const response = await fetch("http://localhost:9000/api/zoom/meetings", { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventToMeeting(appointment)) 
    })
    if (response.ok) {
      setEvents([...events, appointment])
    } else {
      throw new Error("Network response was not ok");
    }
  }


  return (
    <Fragment>
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book a Zoom meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>From {moment(appointment?.start).format("YYYY-MM-DD HH:mm")} </p>
          <p>To {moment(appointment?.end).format("YYYY-MM-DD HH:mm")} </p>
          <Form.Label htmlFor="topic">Objet</Form.Label>
          <Form.Control
            type="topic"
            id="topic"
            defaultValue={appointment.title}
            onChange={(e) => appointment.title = e.target.value}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleValidate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  )
}

export default App;
