"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@heroui/react";

const AccordionForm = ({ accordionData, setAccordionData }: any) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const items = accordionData || [];

    // ADD / UPDATE
    const handleAddOrUpdate = () => {
        if (!title || !desc) return;

        const updatedItems = [...items];

        if (editIndex !== null) {
            // UPDATE
            updatedItems[editIndex] = {
                title,
                accordion_description: desc,
            };
        } else {
            // ADD
            updatedItems.push({
                title,
                accordion_description: desc,
            });
        }

        setAccordionData(updatedItems);

        // RESET
        setTitle("");
        setDesc("");
        setEditIndex(null);
    };

    // DELETE
    const handleDelete = (index: number) => {
        const updated = items.filter((_: any, i: number) => i !== index);
        setAccordionData(updated);

        if (editIndex === index) {
            setTitle("");
            setDesc("");
            setEditIndex(null);
        }
    };

    // EDIT
    const handleEdit = (index: number) => {
        const item = items[index];

        setTitle(item.title);
        setDesc(item.accordion_description);
        setEditIndex(index);
    };

    return (
        <div className="space-y-6">
            {/* INPUT */}
            <div className="flex gap-4 items-end">
                {/* TITLE */}
                <div className="w-[40%]">
                    <Field label="Title">
                        <Input
                            aria-label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
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
                            placeholder="Enter description"
                        />
                    </Field>
                </div>

                {/* BUTTON */}
                <div className="w-[20%]">
                    <Button
                        type="button"
                        color="primary"
                        onClick={handleAddOrUpdate}
                        className="w-full"
                    >
                        {editIndex !== null ? "Update Item" : "Add Item"}
                    </Button>
                </div>
            </div>

            {/* ACCORDION */}
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
                                        <span className="font-medium">
                                            {item.title || `Accordion ${index + 1}`}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            {/* EDIT */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(index);
                                                }}
                                            >
                                                <Pencil size={16} className="text-black" />
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(index);
                                                }}
                                            >
                                                <Trash2 size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                }
                            >
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

// FIELD
const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);