"use client"

import Spinner from '@/components/ui/spinner';
import { getAllEvents } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function ShowAllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const eventData = await getAllEvents();
        const filteredEvents = eventData.filter(event => new Date(event.date) >= new Date()); // Filtrar eventos a partir de la fecha de hoy
        setEvents(filteredEvents);
        console.log('Events:', filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const groupEventsByMonth = () => {
    const groupedEvents = {};
    events.forEach((event) => {
      const month = event.date.toLocaleString('default', { month: 'short' });
      if (!groupedEvents[month]) {
        groupedEvents[month] = [];
      }
      groupedEvents[month].push(event);
    });
    return groupedEvents;
  };

  const addToCalendar = (event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // Asumiendo que el evento dura 1 hora

    const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, "");
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event.event_title)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(event.event_description)}&location=${encodeURIComponent(event.streetAddres)}`;
    window.open(url, "_blank");
};

  const groupedEvents = groupEventsByMonth();

  return (
    <div className="flex flex-col items-center over">
      <h1 className="text-4xl font-bold mt-5 mb-5 font-[GoodBrush]">Próximos eventos</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="events_pc_style" style={{ alignItems: 'stretch' }}>
          {Object.keys(groupedEvents).length === 0 ? (
            <p className="text-2xl opacity-50 ml-3 font-semibold mb-4">No hay eventos planificado próximamente</p>
          ) : (
            Object.entries(groupedEvents).map(([monthYear, eventsInMonth]) => (
              <div key={monthYear} className="mb-8">
                <h2 className="text-2xl opacity-50 ml-3 font-semibold mb-4">{new Date(eventsInMonth[0].date).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <hr className='border-black w-96 ml-3' />
                <div className="flex flex-wrap">
                  {eventsInMonth.map((event) => (
                    <div key={event.id} className="flex event-card rounded-lg w-96 h-full bg-customRed text-white flex mx-4 my-2" style={{ transition: 'transform 0.3s ease' }}>
                      <div className="m-4 flex">
                        <div className="mr-4">
                          <span className="fa-regular fa-calendar-days cursor-pointer text-white text-2xl hover:text-customYellow transition duration-300 mt-1 ease-in-out hover:scale-110 mb-3 opacity-80" onClick={() => addToCalendar(event)} />
                          <p className="font-bold text-2xl">{event.date.getDate()}</p>
                          <p className="font-bold opacity-80">{event.date.toLocaleString('default', { month: 'short' })}</p>
                        </div>
                        <div>
                          <p className="font-bold text-xl">{event.event_title}</p>
                          <hr className="border-white w-32 mb-2 " />
                          <p className="opacity-80 mb-2 mr-10 text-justify">{event.event_description}</p>
                          <div className="flex">
                            <span className="fa-regular fa-clock text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                            <div className="ml-2">{event.eventTime}</div>
                          </div>
                          <div className="cursor-pointer">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.streetAddres)}`} className='flex'>
                              <span className="fa-regular fa-map text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                              <div className="ml-2 w-56">{event.streetAddres}</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};