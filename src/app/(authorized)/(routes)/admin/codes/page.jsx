import CodeCart from "@/components/layout/admin/codes/code-cart"
import CodeCartSinger from "@/components/layout/admin/codes/code-cart-singer"

export default function Page() {
    return <section className="flex items-start justify-center gap-5 mt-20">
        <CodeCart codeType="admin" />
        <CodeCart codeType="director" />
        <CodeCartSinger codeType="singer" />
        <CodeCart codeType="temp" />
    </section>
}