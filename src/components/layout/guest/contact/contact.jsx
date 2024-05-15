import NavBar from '@/components/ui/nav-bar';
import FormContact from './contactForm';

export default async function Contact() {
    let color = "dorado"
    return (
        <main className="fixed h-screen">
            <NavBar color={color}/>
            <FormContact />
        </main>
    )
}