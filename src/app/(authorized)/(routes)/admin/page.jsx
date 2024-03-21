import Button from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return <section>
        <Link
            href="/admin/codes"
        >
            <Button>
                Generar códigos de enlace
            </Button>
        </Link>
    </section>
}