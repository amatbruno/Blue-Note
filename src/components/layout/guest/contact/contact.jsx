import NavBar from '@/components/ui/nav-bar';
import NavBarPhone from '@/components/ui/nav-bar_phone';
import FormContact from './contactForm';

export default async function Contact() {
    let color = "Red"
    return (
        <main className="fixed h-screen">
            <div className="hidden_in_mobile">
                <NavBar color={color} />
            </div>
            <div className="hidden_in_pc">
                <NavBarPhone color={color} />
            </div>
            <div className='phone-move-formcontact'>
                <FormContact />
            </div>
        </main>
    )
}