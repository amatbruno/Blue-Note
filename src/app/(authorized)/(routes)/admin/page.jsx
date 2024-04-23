import DashboardBtn from "@/components/ui/DashboardBtn";
import Link from "next/link";

export default async function Page() {

    return <section className="flex justify-center items-center border h-screen gap-10">
        <Link
            href="/admin/codes"
        >
            <DashboardBtn>
                <p className="py-10 text-2xl w-52 hover:bg-transparent">CÓDIGOS DE ACTIVACIÓN</p>
            </DashboardBtn>
        </Link>

        <Link
            href="/admin/users"
        >
            <DashboardBtn>
                <p className="py-10 text-2xl w-52">GESTIONAR USUARIOS</p>
            </DashboardBtn>
        </Link>

        <Link
            href="/admin/form"
        >
            <DashboardBtn>
                <p className="py-10 text-2xl w-52">GESTIONAR FORMACIONES</p>
            </DashboardBtn>
        </Link>
    </section>
}