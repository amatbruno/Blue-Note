import Login from '@/components/layout/guest/auth/login'

export default function Page() {
    return <section >
        <img src="/images/authBackground.png" className="absolute z-0 inset-0 object-cover w-full h-full" />
        <div className="fixed top-20 left-0 w-full flex justify-center">
            <img src="/images/Logo.png" className="z-10 w-1/5 h-1/6" />
        </div>
        <Login />
    </section>
}