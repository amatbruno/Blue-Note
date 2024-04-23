export default function DashboardBtn({
  children,
  ...props
}) {
  return <button
      {...props}
      className="w-6/6 p-4 text-white rounded-xl hover"
      style={{ background: "#860012" }}
  >
      { children }
  </button>
}