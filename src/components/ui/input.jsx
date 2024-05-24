export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="border w-full py-2 px-2 text-black border-black rounded-lg"
        />
    );
}