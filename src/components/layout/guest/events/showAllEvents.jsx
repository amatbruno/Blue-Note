"use client"
import { getAllEvents } from '@/lib/data';
import { React, useEffect, useState, Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function ShowAllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Set loading to true before fetching data
        const eventData = await getAllEvents();
        setEvents(eventData);
        console.log('Events:', eventData);  
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.length > 0 && events.map((event, index) => (
              <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold">{event.event_name}</h2>
                <p>{event.event_description}</p>
                <p>{event.date}</p>
              </div>
            ))}
            {events.length === 0 && <p>No events found.</p>} // Display message if no events
          </div>
        </div>
      )}
    </div>
  );
}
