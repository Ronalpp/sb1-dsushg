import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Payment } from '../types';
import { DollarSign, ArrowRight } from 'lucide-react';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  payments: Payment[];
  markAsPaid: (id: string) => void;
  postponePayment: (id: string) => void;
  darkMode: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ payments, markAsPaid, postponePayment, darkMode }) => {
  const events = payments.map(payment => ({
    id: payment.id,
    title: payment.name,
    start: new Date(payment.dueDate),
    end: new Date(payment.dueDate),
    allDay: true,
    resource: payment,
  }));

  const eventStyleGetter = (event: any) => {
    const style: React.CSSProperties = {
      backgroundColor: event.resource.paid ? '#10B981' : '#EF4444',
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };
    return { style };
  };

  const handleSelectEvent = (event: any) => {
    if (!event.resource.paid) {
      const action = window.confirm(`Mark "${event.resource.name}" as paid or postpone to next month?`);
      if (action) {
        markAsPaid(event.resource.id);
      } else {
        postponePayment(event.resource.id);
      }
    }
  };

  const getAppLogo = (appName: string) => {
    const logoMap: { [key: string]: string } = {
      'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
      'Netflix': 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
      'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png',
      'Apple': 'https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg',
      'Google': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      // Add more logos as needed
    };

    const lowerCaseAppName = appName.toLowerCase();
    for (const [key, value] of Object.entries(logoMap)) {
      if (lowerCaseAppName.includes(key.toLowerCase())) {
        return value;
      }
    }
    return null;
  };

  return (
    <div className={`h-[600px] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        components={{
          event: (props: any) => {
            const logo = getAppLogo(props.event.title);
            return (
              <div className="flex items-center justify-between p-1 w-full h-full">
                <div className="flex items-center">
                  {logo ? (
                    <img src={logo} alt={props.event.title} className="w-4 h-4 mr-1" />
                  ) : (
                    <DollarSign size={16} className="mr-1" />
                  )}
                  <span className="text-sm font-medium truncate">{props.event.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold mr-1">${props.event.resource.amount}</span>
                  {!props.event.resource.paid && (
                    <ArrowRight size={16} className="text-white" />
                  )}
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default Calendar;