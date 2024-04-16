export default function Button({
    children,
    ...props
}) {
    return <button
        {...props}
        className="w-6/6 p-4 text-white rounded-full"
        style={{ background: "#860012" }}
    >
        { children }
    </button>
}