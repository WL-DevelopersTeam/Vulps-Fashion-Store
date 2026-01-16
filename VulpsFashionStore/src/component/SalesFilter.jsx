export default function SalesFilter({ selected, onChange }) {
    return (
        <div className="flex gap-3 mb-6">
            {["day", "week", "month"].map((item) => (
                <button
                    key={item}
                    onClick={() => onChange(item)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium
            ${selected === item
                            ? "bg-black text-white"
                            : "bg-white border"
                        }`}
                >
                    {item.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
