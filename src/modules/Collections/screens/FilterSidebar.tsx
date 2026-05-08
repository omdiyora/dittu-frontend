'use client';

import { useState } from 'react';

type FilterSidebarProps = {
    selectedFilters: {
        popular: string[];
        category: string[];
    };
    setSelectedFilters: React.Dispatch<
        React.SetStateAction<{
            popular: string[];
            category: string[];
        }>
    >;
};

export default function FilterSidebar({
    setSelectedFilters,
    selectedFilters,
}: FilterSidebarProps) {

    const skinOption = [
        { id: 1, name: 'Body Care', disabled: false },
        { id: 2, name: 'Clean Care', disabled: false },
        { id: 3, name: 'Hair Care', disabled: false },
        { id: 4, name: 'Skin Care', disabled: false },
        { id: 5, name: 'Moisturizer Care', disabled: false },
    ];

    const productOption = [
        { id: 1, name: 'New', disabled: false },
        { id: 2, name: 'Featured', disabled: false },
        { id: 3, name: 'Best selling', disabled: false },
        { id: 4, name: 'Sale', disabled: false },
    ];

    const [openSections, setOpenSections] = useState({
        popular: true,
        category: true,
    });

    const toggle = (key: keyof typeof openSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const allFilters = [
        ...selectedFilters.popular,
        ...selectedFilters.category,
    ];

    const removeFilter = (filter: string) => {
        setSelectedFilters((prev) => ({
            popular: prev.popular.filter((f) => f !== filter),
            category: prev.category.filter((f) => f !== filter),
        }));
    };

    return (
        <aside className="w-full lg:w-[300px] space-y-6 text-sm">

            {/* Selected Filters */}
            {allFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-6">

                    {allFilters.map((filter, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm bg-[#fcfaf7]"
                        >
                            <span className="uppercase">{filter}</span>

                            <button
                                onClick={() => removeFilter(filter)}
                                className="text-gray-500 hover:text-black"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Clear All */}
                    <button
                        onClick={() =>
                            setSelectedFilters({
                                popular: [],
                                category: [],
                            })
                        }
                        className="text-sm underline ml-2"
                    >
                        CLEAR ALL
                    </button>
                </div>
            )}

            {/* POPULAR PICKS */}
            <div className="border-t pt-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-3 p-2"
                    onClick={() => toggle('popular')}
                >
                    <h3 className="font-medium text-base">
                        POPULAR PICKS
                    </h3>

                    <span className="text-[30px]">
                        {openSections.popular ? '−' : '+'}
                    </span>
                </div>

                {openSections.popular && (
                    <div className="space-y-3 p-2">
                        {productOption.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 ${
                                    item.disabled
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'cursor-pointer'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    disabled={item.disabled}
                                    checked={selectedFilters.popular.includes(item.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                popular: [
                                                    ...prev.popular,
                                                    item.name,
                                                ],
                                            }));
                                        } else {
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                popular: prev.popular.filter(
                                                    (f) => f !== item.name
                                                ),
                                            }));
                                        }
                                    }}
                                    className="hidden"
                                />

                                {/* Custom Checkbox */}
                                <div
                                    className={`w-[16px] h-[16px] border flex items-center justify-center
                                    ${
                                        item.disabled
                                            ? 'border-gray-200'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`w-[10px] h-[10px] transition
                                        ${
                                            item.disabled
                                                ? 'bg-gray-300'
                                                : selectedFilters.popular.includes(item.name)
                                                ? 'bg-[#e07a5f] opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    />
                                </div>

                                <span className="text-[14px]">
                                    {item.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* CATEGORY TYPE */}
            <div className="border-t pt-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-3 p-2"
                    onClick={() => toggle('category')}
                >
                    <h3 className="font-medium text-base">
                        CATEGORY TYPE
                    </h3>

                    <span className="text-[30px]">
                        {openSections.category ? '−' : '+'}
                    </span>
                </div>

                {openSections.category && (
                    <div className="space-y-3 p-2">
                        {skinOption.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 ${
                                    item.disabled
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'cursor-pointer'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    disabled={item.disabled}
                                    checked={selectedFilters.category.includes(item.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                category: [
                                                    ...prev.category,
                                                    item.name,
                                                ],
                                            }));
                                        } else {
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                category: prev.category.filter(
                                                    (f) => f !== item.name
                                                ),
                                            }));
                                        }
                                    }}
                                    className="hidden"
                                />

                                {/* Custom Checkbox */}
                                <div
                                    className={`w-[16px] h-[16px] border flex items-center justify-center
                                    ${
                                        item.disabled
                                            ? 'border-gray-200'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`w-[10px] h-[10px] transition
                                        ${
                                            item.disabled
                                                ? 'bg-gray-300'
                                                : selectedFilters.category.includes(item.name)
                                                ? 'bg-[#e07a5f] opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    />
                                </div>

                                <span className="text-[14px]">
                                    {item.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}