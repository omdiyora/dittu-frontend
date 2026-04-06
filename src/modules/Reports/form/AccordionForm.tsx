"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@heroui/react";

const AccordionForm = ({ accordionData, setAccordionData }: any) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const items = accordionData || [];

    // ✅ ADD ITEM
    const handleAdd = () => {
        if (!title || !desc) return;

        const newItem = {
            title,
            accordion_description: desc,
        };

        const updated = [...items, newItem];

        setAccordionData(updated);

        setTitle("");
        setDesc("");

        console.log(updated);
    };

    // ✅ DELETE ITEM
    const handleDelete = (index: number) => {
        const updated = items.filter((_: any, i: number) => i !== index);
        setAccordionData(updated);
    };

    return (
        <div className="space-y-6">

            {/* INPUT ROW */}
            <div className="flex gap-4 items-end">

                {/* TITLE */}
                <div className="w-[40%]">
                    <Field label="Title">
                        <Input
                            aria-label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </Field>
                </div>

                {/* DESCRIPTION */}
                <div className="w-[40%]">
                    <Field label="Description">
                        <Input
                            aria-label="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                        />
                    </Field>
                </div>

                {/* BUTTON */}
                <div className="w-[20%]">
                    <Button
                        type="button"
                        color="primary"
                        onClick={handleAdd}
                        className="w-full"
                    >
                        Add Item
                    </Button>
                </div>
            </div>

            {/* ACCORDION UI */}
            <div className="bg-white border rounded-lg p-2">

                {items.length === 0 ? (
                    <div className="p-4 text-sm text-gray-400 text-center">
                        No items added
                    </div>
                ) : (
                    <Accordion selectionMode="multiple" variant="bordered">

                        {items.map((item: any, index: number) => (
                            <AccordionItem
                                key={index}
                                aria-label={`Accordion ${index + 1}`}
                                title={
                                    <div className="flex justify-between items-center w-full">

                                        {/* TITLE */}
                                        <span className="font-medium">
                                            {item.title || `Accordion ${index + 1}`}
                                        </span>

                                        {/* DELETE */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(index);
                                            }}
                                        >
                                            <Trash2 size={16} className="text-red-500" />
                                        </button>

                                    </div>
                                }
                            >
                                {/* CONTENT */}
                                <p className="text-sm text-gray-600">
                                    {item.accordion_description}
                                </p>
                            </AccordionItem>
                        ))}

                    </Accordion>
                )}

            </div>
        </div>
    );
};

export default AccordionForm;

// 🔹 FIELD COMPONENT
const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);