"use client"

import { getAllEvents } from '@/lib/data';
import { React, useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';

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

  const groupedEvents = groupEventsByMonth();

  return (
    <div className="flex flex-col items-center over">
      <h1 className="text-4xl font-bold mt-5 mb-5">Próximos eventos</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap w-3/5 ml-36 h-full" style={{ alignItems: 'stretch' }}>
          {Object.entries(groupedEvents).map(([monthYear, eventsInMonth]) => (
            <div key={monthYear} className="mb-8">
              <h2 className="text-2xl opacity-50 ml-3 font-semibold mb-4">{new Date(eventsInMonth[0].date).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
              <hr className='border-black w-96 ml-3'/>
              <div className="flex flex-wrap">
                {eventsInMonth.map((event) => (
                  <div
                    key={event.event_id}
                    className="event-card rounded-lg w-72 bg-customRed text-white flex flex-col mx-4 my-2"
                    style={{ transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div className="m-4 flex">
                      <div className="mr-4">
                        <p className="font-bold text-2xl">{event.date.getDate()}</p>
                        <p className="font-bold opacity-80">{event.date.toLocaleString('default', { month: 'short' })}</p>
                      </div>
                      <div className="">
                        <p className="font-bold text-xl">{event.event_title}</p>
                        <hr className="border-white w-full mb-2" />
                        <div className="opacity-80 mb-2 mr-2 text-justify">{event.event_description}</div>
                        <div className="flex">
                          <span className="fa-regular fa-clock text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                          <div className="ml-2">{event.eventTime}</div>
                        </div>
                        <div className="cursor-pointer">
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.streetAddres)}`} className='flex' >
                            <span className="fa-regular fa-map text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                            <div className="ml-2">{event.streetAddres}</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
