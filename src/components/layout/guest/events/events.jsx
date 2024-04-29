import NavBar from '@/components/ui/nav-bar';
import ShowAllEvents from './showAllEvents';

export default async function Events() {
    const color = "amarillo";
    return (
        <main>
            <NavBar color={color}/>
            <ShowAllEvents />
        </main>
    )
}