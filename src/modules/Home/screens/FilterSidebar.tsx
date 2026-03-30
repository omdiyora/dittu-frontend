'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FilterSidebar() {

    const skinOption = [
        { id: 1, name: 'Dry Skin (1)', disabled: false },
        { id: 2, name: 'Normal Skin (2)', disabled: false },
        { id: 3, name: 'Oily Skin (1)', disabled: false },
        { id: 4, name: 'Sensitive Skin (0)', disabled: true },
    ];

    const [openSections, setOpenSections] = useState({
        price: true,
        size: false,
        availability: true,
        skin: true,
    });


    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const toggle = (key: keyof typeof openSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <aside className="w-full lg:w-[300px] space-y-6 text-sm">
            {selectedFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-6">

                    {selectedFilters.map((filter, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm bg-[#fcfaf7]"
                        >
                            <span className="uppercase">{filter}</span>

                            <button
                                onClick={() =>
                                    setSelectedFilters((prev) =>
                                        prev.filter((f) => f !== filter)
                                    )
                                }
                                className="text-gray-500 hover:text-black"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Clear All */}
                    <button
                        onClick={() => setSelectedFilters([])}
                        className="text-sm underline ml-2"
                    >
                        CLEAR ALL
                    </button>
                </div>
            )}

            {/* PRICE */}
            <div>
                <div
                    className="flex justify-between items-center cursor-pointer mb-3"
                    onClick={() => toggle('price')}
                >
                    <h3 className="font-medium">PRICE</h3>
                    <span>{openSections.price ? '−' : '+'}</span>
                </div>

                {openSections.price && (
                    <div>
                        <input type="range" className="w-full accent-black" />
                        <div className="flex justify-between mt-3 gap-2">
                            <div className="border rounded-full px-3 py-1 w-full text-center">
                                $ 0
                            </div>
                            <div className="border rounded-full px-3 py-1 w-full text-center">
                                $ 210.00
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* SKIN TYPE */}
            <div className="border-t pt-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-3 p-2 text-base"
                    onClick={() => toggle('skin')}
                >
                    <h3 className="font-medium text-base">SKIN TYPE</h3>
                    <span className="text-[30px]">{openSections.skin ? '−' : '+'}</span>
                </div>

                {openSections.skin && (
                    <div className="space-y-3 p-2">
                        {skinOption.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 ${item.disabled
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'cursor-pointer'
                                    } group`}
                            >
                                {/* Input */}
                                <input
                                    type="checkbox"
                                    disabled={item.disabled}
                                    checked={selectedFilters.includes(item.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedFilters((prev) =>
                                                prev.includes(item.name) ? prev : [...prev, item.name]
                                            );
                                        } else {
                                            setSelectedFilters((prev) =>
                                                prev.filter((f) => f !== item.name)
                                            );
                                        }
                                    }}
                                    className="hidden"
                                />

                                {/* Custom Checkbox */}
                                <div
                                    className={`w-[16px] h-[16px] border flex items-center justify-center
                                    ${item.disabled ? 'border-gray-200' : 'border-gray-300'}`}
                                >
                                    <div
                                        className={`w-[10px] h-[10px] transition
                                                ${item.disabled
                                                ? 'bg-gray-300'
                                                : selectedFilters.includes(item.name)
                                                    ? 'bg-[#e07a5f] opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                    />
                                </div>

                                <span className="text-[14px]">{item.name}</span>
                            </label>
                        ))}
                    </div>
                )
                }
            </div >
        </aside >
    );
}