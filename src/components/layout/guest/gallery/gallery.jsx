import NavBar from '@/components/ui/nav-bar';

export default async function Gallery() {
    let color = "rojo"
    return (
        <main className="fixed h-screen">
            <NavBar color={color}/>
        </main>
    )
}