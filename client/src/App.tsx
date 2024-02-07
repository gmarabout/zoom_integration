import React, { FC, Fragment, useState, useCallback, useMemo } from 'react'
import moment from "moment";
import { Calendar, Views, momentLocalizer, SlotInfo } from 'react-big-calendar'
import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr-FR");
const localizer = momentLocalizer(moment);

const App: FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  const handleSelect = (slotInfo: SlotInfo) => {
    console.log(slotInfo.start);
    console.log(slotInfo.end);
  }
    
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

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
      </Fragment>
  )
}

export default App;
