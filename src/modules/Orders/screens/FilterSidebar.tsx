'use client';

type Props = {
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
    categoryOptions: string[];
};

export default function FilterSidebar({
    selectedFilters,
    setSelectedFilters,
    categoryOptions,
}: Props) {

    return (
        <aside className="w-full lg:w-[300px] space-y-6 text-sm">

            {/* Selected Filters */}
            {selectedFilters.length > 0 && (

                <div className="flex flex-wrap items-center gap-3 mb-6">

                    {selectedFilters.map((filter, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm bg-[#fcfaf7]"
                        >
                            <span>{filter}</span>

                            <button
                                onClick={() =>
                                    setSelectedFilters((prev) =>
                                        prev.filter((f) => f !== filter)
                                    )
                                }
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => setSelectedFilters([])}
                        className="text-sm underline ml-2"
                    >
                        CLEAR ALL
                    </button>

                </div>
            )}

            {/* CATEGORY */}
            <div className="border-t pt-4">

                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-base">
                        CATEGORY
                    </h3>
                </div>

                <div className="space-y-3">

                    {categoryOptions.map((category) => (

                        <label
                            key={category}
                            className="flex items-center gap-3 cursor-pointer"
                        >

                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(category)}
                                onChange={(e) => {

                                    if (e.target.checked) {

                                        setSelectedFilters((prev) => [
                                            ...prev,
                                            category,
                                        ]);

                                    } else {

                                        setSelectedFilters((prev) =>
                                            prev.filter((f) => f !== category)
                                        );
                                    }
                                }}
                            />

                            <span className="text-[14px]">
                                {category}
                            </span>

                        </label>
                    ))}

                </div>

            </div>

        </aside>
    );
}