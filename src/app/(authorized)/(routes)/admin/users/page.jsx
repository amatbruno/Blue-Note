import UserTable from "@/components/layout/admin/users/user-table"

export default function Page() {
    return <section className="flex gap-5 mt-20">
        <article className='border border-black px-10 py-10 h-fit w-fit rounded-xl'>
            <h1 className='text-2xl font-semibold text-center'>Panel de filtros</h1>

            <div className="flex justify-start items-center mt-8 gap-2">
                <img width="30" src="/images/icons/search.png" alt="" />
                <input placeholder="Nombre de voz" className="border border-gray-600 rounded-md w-[250px] px-1 py-0.5" type="text" id="search-user" />
            </div>

            <div className='flex flex-col justify-center gap-3 mt-8'>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="soprano" id="soprano" className="w-4" />
                    <label className="text-lg" htmlFor="soprano">Soprano</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="tenor" id="tenor" className="w-4" />
                    <label className="text-lg" htmlFor="tenor">Tenor</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="contralto" id="contralto" className="w-4" />
                    <label className="text-lg" htmlFor="contralto">Contralto</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="bajo" id="bajo" className="w-4" />
                    <label className="text-lg" htmlFor="bajo">Bajo</label>
                </div>
            </div>

            <div className="flex items-center gap-5 mt-8">
                <label htmlFor="height-range">Altura min</label>
                <input type="range" name="height-range" id="" />
                <label htmlFor="height-range">Altura max</label>
            </div>

            <div className='flex flex-col justify-center gap-3 mt-8'>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="soprano" id="soprano" className="w-4" />
                    <label className="text-lg" htmlFor="soprano">Soprano</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="tenor" id="tenor" className="w-4" />
                    <label className="text-lg" htmlFor="tenor">Tenor</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="contralto" id="contralto" className="w-4" />
                    <label className="text-lg" htmlFor="contralto">Contralto</label>
                </div>
                <div className="flex justify-start gap-3">
                    <input type="checkbox" name="bajo" id="bajo" className="w-4" />
                    <label className="text-lg" htmlFor="bajo">Bajo</label>
                </div>
            </div>
        </article>
        <UserTable />
    </section>
}