import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const calendarStyle = {
    height: '70vh', // Adjust height as needed
    width: '100%', // Full width
    margin: '0 auto' // Add some space at the top and bottom
  };

  return (
    <div style={calendarStyle}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }} // Make the calendar full height and width of its container
      />
    </div>
  );
};

export default MyCalendar;
