import NavBar from '@/components/ui/nav-bar';

export default async function AboutUs() {
    let color = "naranja"
    return (
        <main className="fixed h-screen">
            <NavBar color={color} />
        </main>
    )
}