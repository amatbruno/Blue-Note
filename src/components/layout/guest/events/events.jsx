import NavBar from '@/components/ui/nav-bar';
import NavBarPhone from '@/components/ui/nav-bar_phone';
import ShowAllEvents from './showAllEvents';

export default async function Events() {
    const color = "Red";
    return (
        <main>
            <div className="hidden_in_mobile">
                <NavBar color={color} />
            </div>
            <div className="hidden_in_pc">
                <NavBarPhone color={color} />
            </div>
            <ShowAllEvents />
        </main>
    )
}