import Button from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return <section className="flex gap-3">
        <Link
            href="/admin/codes"
        >
            <Button>
                Generar códigos de enlace
            </Button>
        </Link>

        <Link
            href="/admin/voces"
        >
            <Button>
                Administrar voces
            </Button>
        </Link>
    </section>
}