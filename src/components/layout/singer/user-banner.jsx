"use client"
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useFormState } from "react-dom";
import "react-calendar/dist/Calendar.css";
import { getUserSession, getAllEvents, GetAllJoinEvents } from "@/lib/data";
import Spinner from "@/components/ui/spinner";
import { Plataforms } from "@/components/ui/plataforms";
import { JoinEvents } from "@/lib/data";

export default function UserBanner() {
    const [user, setUser] = useState(null);
    const [verificationCompleted, setVerificationCompleted] = useState(false);
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [joined, setJoined] = useState([])

    const [state, dispatch] = useFormState(JoinEvents, undefined);
    
    const onChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserSession();
                const eventsData = await getAllEvents();
                const joinedData = await GetAllJoinEvents();
                setUser(userData);
                setEvents(eventsData);
                setJoined(joinedData);
                setVerificationCompleted(true);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [state]);

    const joinEvent = (event) => {
        setSelectedEvent(event);
        console.log(event.event_id)
    };

    const isEventDay = (date) => {
        const eventDate = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
        return !!eventDate;
    };

    const customDayClassName = ({ date }) => {
        return isEventDay(date) ? "event-day" : null;
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

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventDate = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
            if (eventDate) {
                const isJoinedEvent = joined.find((joinedEvent) => {
                    return (
                        new Date(joinedEvent.dateEvent).toDateString() === date.toDateString() &&
                        joinedEvent.userId === user.id
                    );
                });
                if (isJoinedEvent) {
                    return <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '10px', height: '10px' }} />;
                } else {
                    return <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '10px', height: '10px' }} />;
                }
            }
        }
        return null;
    };

    if (!verificationCompleted) {
        return <Spinner />;
    }

    return (
        <section className="">
            <div className="flex flex-wrap ml-80">
                <Plataforms />
                <div className="flex ml-36 mb-28 justify-center items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-6">Agenda</h1>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            className="events-calendar "
                            dayClassName={customDayClassName}
                            tileContent={tileContent}
                        />
                    </div>
                    <div>
                        <form
                            action={dispatch}
                        >
                            {events.filter((event) => new Date(event.date).toDateString() === date.toDateString()).map((event) => (
                                <div className="flex mt-20 ml-16 event-card rounded-lg w-96 h-full bg-customOrange text-white flex mx-4 my-2" style={{ transition: 'transform 0.3s ease' }}>
                                    <div key={event.id}>
                                        <div className="m-4 flex">
                                            <div className="mr-4">
                                                <span className="fa-regular fa-calendar-days cursor-pointer text-white text-2xl hover:text-customYellow transition duration-300 mt-1 ease-in-out hover:scale-110 mb-3 opacity-80" onClick={() => addToCalendar(event)} />
                                                <p className="font-bold text-2xl">{event.date.getDate()}</p>
                                                <p className="font-bold opacity-80">{event.date.toLocaleString('default', { month: 'short' })}</p>
                                            </div>
                                            <div className="">
                                                <p className="font-bold text-xl">{event.event_title}</p>
                                                <hr className="border-white w-32 mb-2 " />
                                                <p className="opacity-80 mb-2 mr-10 text-justify">{event.event_description}</p>
                                                <div className="flex">
                                                    <span className="fa-regular fa-clock text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                                                    <div className="ml-2">{event.eventTime}</div>
                                                </div>
                                                <div className="cursor-pointer">
                                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.streetAddres)}`} className='flex' >
                                                        <span className="fa-regular fa-map text-lg mt-1 text-white hover:text-yellow-600 cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
                                                        <div className="ml-2 w-56">{event.streetAddres}</div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center pb-5">
                                            <button
                                                id="eventButton"
                                                name="eventId"
                                                type="submit"
                                                value={selectedEvent?.event_id}
                                                onClick={() => joinEvent(event)}
                                                className={`cursor-pointer`}
                                            >
                                                Asistir 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <input type="hidden" name="dateEvent" value={selectedEvent?.date} />
                            <input type="hidden" name="userId" value={user.id} />
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
} 