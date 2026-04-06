"use client";

import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";

const ImageUpload = ({ files, setFiles }: any) => {

    const handleFiles = async (selectedFiles: FileList) => {
        const newFiles = Array.from(selectedFiles).map((file) => ({
            file,
            name: file.name,
            progress: 0,
            url: "",
        }));

        setFiles((prev: any) => [...prev, ...newFiles]);

        newFiles.forEach(async (f) => {
            const formData = new FormData();
            formData.append("file", f.file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setFiles((prev: any) =>
                    prev.map((item: any) =>
                        item.name === f.name
                            ? { ...item, url: data.url, progress: 100 }
                            : item
                    )
                );
            }
        });
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDelete = (name: string) => {
        setFiles((prev: any) => prev.filter((f: any) => f.name !== name));
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">

            {/* DROP ZONE */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-blue-400 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-white"
            >
                <UploadCloud size={40} className="text-blue-500 mb-3" />

                <button
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="bg-blue-500 text-white px-5 py-2 rounded-full mb-2"
                >
                    Browse
                </button>

                <p className="text-gray-400 text-sm">drop a file here</p>

                <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files!)}
                    className="hidden"
                />
            </div>

            {/* FILE LIST */}
            <div className="bg-white rounded-xl border p-4">
                <h2 className="font-semibold mb-4">Uploaded files</h2>

                <div className="space-y-3">
                    {files?.map((file: any, i: number) => (
                        <div key={i} className="flex justify-between items-center">

                            <div className="flex items-center gap-2">
                                <ImageIcon size={18} className="text-blue-500" />
                                <span className="text-sm">{file.name}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                {file.progress < 100 ? (
                                    <div className="w-24 h-2 bg-gray-200 rounded">
                                        <div
                                            className="h-2 bg-blue-500 rounded"
                                            style={{ width: `${file.progress}%` }}
                                        />
                                    </div>
                                ) : (
                                    <span className="text-green-500 text-xs">Done</span>
                                )}

                                <button onClick={() => handleDelete(file.name)}>
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ImageUpload;