import Link from "next/link"

export const Plataforms = () => {
    return (
        <div className="ml-36 mt-28">
            <h1 className="text-3xl font-bold mb-4 font-[GoodBrush]">Plataformas</h1>
            <Link href="https://accounts.bandlab.com/login?ReturnUrl=https%3A%2F%2Faccounts.bandlab.com%2Foauth%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dbandlab_web%26scope%3Dopenid%2520profile%2520email%2520linked_accounts%2520offline_access%26response_type%3Dcode%26response_mode%3Dfragment%26auth_type%3Dbandlab_auth_code%26redirect_uri%3Dhttps%253A%252F%252Fwww.bandlab.com%252Fauth%252Fbandlab%252Fcallback%26nonce%3Dg6hhsslgom">
                <img className="cursor-ponter w-36 mt-10 bg-customBlack rounded p-4" src="/icons/bandLab.png" />
            </Link>
            <Link href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
                <img className="cursor-ponter w-36 mt-10 bg-customBlack rounded p-4" src="/icons/drive.png" />
            </Link>
            <Link href="https://drive.google.com/drive/home">
                <img className="cursor-ponter w-36 mt-10 bg-customBlack rounded p-4" src="/icons/email.png" />
            </Link>
        </div>
    )
}