export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="border w-4/5 p-2 border-black rounded-full"
        />
    );
}