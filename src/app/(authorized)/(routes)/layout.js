import Navigator from "@/components/layout/navigator"

export default function Layout({
    children
}) {
    return <main>
        <Navigator />

        { children }
    </main>
}