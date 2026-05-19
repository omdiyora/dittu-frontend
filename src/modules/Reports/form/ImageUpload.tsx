"use client";

import { UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";

import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface ImageItem {
    id: number;
    image_name: string;
    image_url: string;
    progress: number;
}

interface Props {
    files: ImageItem[];
    setFiles: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

/* =========================
   SORTABLE ITEM
========================= */

function SortableItem({
    file,
    index,
    handleDelete,
}: any) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: file.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between border rounded-xl p-3 bg-white"
        >

            <div className="flex items-center gap-3">

                {/* DRAG HANDLE */}
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <div className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center">
                        {index + 1}
                    </div>
                </div>

                {/* IMAGE */}
                {file.image_url ? (
                    <Image
                        src={file.image_url}
                        alt={file.image_name}
                        width={55}
                        height={55}
                        className="rounded-lg object-cover border"
                    />
                ) : (
                    <div className="w-[55px] h-[55px] rounded-lg bg-gray-200 animate-pulse" />
                )}

                {/* NAME */}
                <div>
                    <p className="text-sm font-medium">
                        {file.image_name}
                    </p>

                    {file.progress < 100 ? (
                        <div className="w-28 h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                            <div
                                className="h-full bg-black"
                                style={{
                                    width: `${file.progress}%`,
                                }}
                            />
                        </div>
                    ) : (
                        <p className="text-xs text-green-500">
                            Uploaded
                        </p>
                    )}
                </div>

            </div>

            {/* DELETE */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                }}
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 size={18} />
            </button>

        </div>
    );
}
/* =========================
   MAIN COMPONENT
========================= */

export default function ImageUpload({
    files,
    setFiles,
}: Props) {

    /* =========================
       HANDLE FILES
    ========================= */

    const handleFiles = async (
        selectedFiles: FileList
    ) => {

        const newFiles: ImageItem[] = Array.from(
            selectedFiles
        ).map((file, index) => ({
            id: Date.now() + index,
            image_name: file.name,
            image_url: "",
            progress: 0,
        }));

        /* ADD TEMP FILES */
        setFiles((prev) => [...prev, ...newFiles]);

        /* UPLOAD ONE BY ONE */
        Array.from(selectedFiles).forEach(
            async (file, index) => {

                const currentId = newFiles[index].id;

                const formData = new FormData();
                formData.append("file", file);

                try {

                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await res.json();

                    if (res.ok) {

                        setFiles((prev) =>
                            prev.map((item) =>
                                item.id === currentId
                                    ? {
                                        ...item,
                                        image_url: data.url,
                                        progress: 100,
                                    }
                                    : item
                            )
                        );

                    }

                } catch (error) {
                    console.log(error);
                }
            }
        );
    };

    /* =========================
       DRAG DROP
    ========================= */

    const handleDragEnd = (event: any) => {

        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setFiles((items) => {

            const oldIndex = items.findIndex(
                (item) => item.id === active.id
            );

            const newIndex = items.findIndex(
                (item) => item.id === over.id
            );

            return arrayMove(
                items,
                oldIndex,
                newIndex
            );
        });
    };

    /* =========================
       DELETE IMAGE
    ========================= */
    console.log(files, 'files');

    const handleDelete = (id: number) => {

        setFiles((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );
    };

    /* =========================
       DROP
    ========================= */

    const handleDrop = (e: any) => {
        e.preventDefault();

        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">

            {/* =========================
          DROP ZONE
      ========================= */}

            <div
                onDrop={handleDrop}
                onDragOver={(e) =>
                    e.preventDefault()
                }
                className="border-2 border-dashed border-black rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white"
            >

                <UploadCloud
                    size={45}
                    className="mb-4"
                />

                <button
                    type="button"
                    onClick={() =>
                        document
                            .getElementById("fileInput")
                            ?.click()
                    }
                    className="bg-black text-white px-5 py-2 rounded-full"
                >
                    Browse Files
                </button>

                <p className="text-sm text-gray-400 mt-3">
                    Drag & drop images here
                </p>

                <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                        handleFiles(
                            e.target.files!
                        )
                    }
                />

            </div>

            {/* =========================
          UPLOADED FILES
      ========================= */}

            <div className="bg-white border rounded-2xl p-4">

                <h2 className="font-semibold mb-4">
                    Uploaded files
                </h2>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >

                    <SortableContext
                        items={files?.map(
                            (f) => f.id
                        )}
                        strategy={
                            verticalListSortingStrategy
                        }
                    >

                        <div className="space-y-3">

                            {files?.map(
                                (file, index) => (
                                    <SortableItem
                                        key={file.id}
                                        file={file}
                                        index={index}
                                        handleDelete={
                                            handleDelete
                                        }
                                    />
                                )
                            )}

                        </div>

                    </SortableContext>

                </DndContext>

            </div>

        </div>
    );
}