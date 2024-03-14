export default function Button({
    children,
    ...props
}) {
    return <button
        {...props}
        className="border border-blue-500 text-blue-500 bg-blue-500/20"
    >
        { children }
    </button>
}