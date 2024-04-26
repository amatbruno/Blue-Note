import NavBar from '@/components/ui/nav-bar';
import ShowAllEvents from './showAllEvents';

export default async function Events() {

    return (
        <main className="fixed h-screen">
            <NavBar />
            <ShowAllEvents />
        </main>
    )
}