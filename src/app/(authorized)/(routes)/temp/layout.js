import Navigator from "@/components/layout/navigator"
import { getUserSession } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Layout({
    children
}) {
    const user = await getUserSession(); 

    if(!user) {
        return redirect('/');
    } else if (user.type != 'TEMP') {
        return redirect('/' + user.type.toLowerCase())
    }
    return <main>
        { children }
    </main>
}