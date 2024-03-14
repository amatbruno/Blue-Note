export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="border border-blue-500 text-blue-500 bg-blue-500/20"
        />
    );
}