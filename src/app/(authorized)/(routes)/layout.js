import Navigator from "@/components/layout/navigator"
import { getUserSession } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Layout({
    children
}) {
    const user = await getUserSession(); 

    if(!user) {
        return redirect('/');
    }

    return <main>
        <Navigator />

        { children }
    </main>
}