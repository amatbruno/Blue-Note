import Button from "@/components/ui/button";

import Link from "next/link";


export default async function Page() {

    return <section>
        <Link
            href="/admin/codes"
        >
            <Button>
                Generar códigos de enlace
            </Button>
        </Link>
        <Link
            href="/admin/users"
        >
            <Button>
                Generar códigos de enlace
            </Button>
        </Link>
        
    </section>
}