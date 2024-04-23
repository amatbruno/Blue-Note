export default function DashboardBtn({
  children,
  ...props
}) {
  return <button
    {...props}
    className="w-6/6 p-4 text-white border-4 border-[#860012] rounded-xl bg-[#860012] 
      hover:bg-transparent font-bold hover:border-4 hover:border-[#860012] transition-all hover:text-[#860012]"
  >
    {children}
  </button>
}