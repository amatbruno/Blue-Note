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
        setEvents(eventData);
        console.log('Events:', eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table-fixed">
          <tbody className='flex gap-10'>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.event_title}</td>
                <td>{event.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}