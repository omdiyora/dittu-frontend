"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
    Switch,
} from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import ImageUpload from "./ImageUpload";
import AccordionForm from "./AccordionForm";

const EditProduct = () => {
    const router = useRouter();
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [files, setFiles] = useState<any[]>([]);
    const [accordionData, setAccordionData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const productId = params?.id;

    console.log(productData,'params');
    

    // Fetch single product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`);
                const data = await res.json();

                setProductData(data);

                // Set images
                if (data?.images?.length) {
                    const formattedImages = data.images.map((img: string) => ({
                        url: img,
                    }));
                    setFiles(formattedImages);
                }

                // Set accordion data
                if (data?.product_details) {
                    setAccordionData(data.product_details);
                }
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (values: any) => {
        try {
            const imagesURL = files.map((file: any) => file.url);

            const res = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    images: imagesURL,
                    sizes:
                        typeof values.sizes === "string"
                            ? values.sizes.split(",")
                            : values.sizes,
                    product_details: accordionData,
                }),
            });

            if (res.ok) {
                enqueueSnackbar("Product updated successfully", {
                    variant: "success",
                });

                router.push("/admin/product");
            } else {
                enqueueSnackbar("Failed to update product", {
                    variant: "error",
                });
            }
        } catch (error) {
            enqueueSnackbar("Error updating product", {
                variant: "error",
            });
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="bg-white rounded-md h-full overflow-auto">
            {/* Header */}
            <div className="border-b px-8 h-20 flex items-center">
                <h1 className="text-xl font-semibold">Edit Product</h1>
            </div>

            {/* Form */}
            <div className="p-8">
                <div className="mb-6">
                    <ImageUpload files={files} setFiles={setFiles} />
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: productData?.name || "",
                        description: productData?.description || "",
                        price: productData?.price || "",
                        original_price: productData?.original_price || "",
                        badge_type: productData?.badge_type || "",
                        badge: productData?.badge || "",
                        sizes: productData?.sizes?.join(",") || "",
                        stock: productData?.stock || "",
                        category: productData?.category || "",
                        is_active: productData?.is_active ?? true,
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, setFieldValue }) => (
                        <Form className="space-y-6">
                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Name */}
                                <Field label="Product Name">
                                    <Input
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                    />
                                </Field>

                                {/* Category */}
                                <Field label="Category">
                                    <Input
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        placeholder="Enter category"
                                    />
                                </Field>

                                {/* Sizes */}
                                <Field label="Sizes">
                                    <Input
                                        name="sizes"
                                        value={values.sizes}
                                        onChange={handleChange}
                                        placeholder="45ml,75ml,100ml"
                                    />
                                </Field>

                                {/* Price */}
                                <Field label="Price">
                                    <Input
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                    />
                                </Field>

                                {/* Original Price */}
                                <Field label="Original Price">
                                    <Input
                                        type="number"
                                        name="original_price"
                                        value={values.original_price}
                                        onChange={handleChange}
                                        placeholder="Enter original price"
                                    />
                                </Field>

                                {/* Stock */}
                                <Field label="Stock">
                                    <Input
                                        type="number"
                                        name="stock"
                                        value={values.stock}
                                        onChange={handleChange}
                                        placeholder="Enter stock"
                                    />
                                </Field>

                                {/* Badge Type */}
                                <Field label="Badge Type">
                                    <Select
                                        selectedKeys={values.badge_type}
                                        onChange={(e) =>
                                            setFieldValue("badge_type", e.target.value)
                                        }
                                        placeholder="Select badge"
                                        // defaultSelectedKeys={values.badge_type}
                                    >
                                        <SelectItem key="sale">Sale</SelectItem>
                                        <SelectItem key="featured">Featured</SelectItem>
                                        <SelectItem key="bestseller">Bestseller</SelectItem>
                                        <SelectItem key="new">New</SelectItem>
                                    </Select>
                                </Field>

                                {/* Badge */}
                                <Field label="Badge">
                                    <Input
                                        name="badge"
                                        value={values.badge}
                                        onChange={handleChange}
                                        placeholder="Enter badge"
                                    />
                                </Field>

                                {/* Active */}
                                <div className="flex items-center gap-4 mt-6">
                                    <Switch
                                        isSelected={values.is_active}
                                        onValueChange={(val) =>
                                            setFieldValue("is_active", val)
                                        }
                                    />
                                    <span>Active Product</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                    className="mt-2"
                                />
                            </div>

                            {/* Accordion */}
                            <AccordionForm
                                accordionData={accordionData}
                                setAccordionData={setAccordionData}
                            />

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <Button type="submit" color="primary">
                                    Update Product
                                </Button>

                                <Button
                                    variant="flat"
                                    onClick={() => router.push("/admin/product")}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditProduct;

/* Field Wrapper */
const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);