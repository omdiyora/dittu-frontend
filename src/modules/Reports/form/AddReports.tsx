"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import ImageUpload from "./ImageUpload";
import AccordionForm from "./AccordionForm";

const CreateProduct = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [accordionData, setAccordionData] = useState([]);

  console.log(accordionData, 'accordionData');
  const imagesURL = files.map((e: any) => e.url)
  const handleSubmit = async (values: any) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          name: values.name,
          images: imagesURL,
          description: values.description,
          price: values.price,
          original_price: values.original_price,
          badge: values.badge,
          stock: values.stock,
          is_active: values.is_active,
          sizes: values.sizes.split(","),
          product_details: accordionData,
        }),
      });

      if (res.ok) {
        enqueueSnackbar("Product created successfully", { variant: "success" });
        router.push("/dashboard/products");
      }
    } catch (err) {
      enqueueSnackbar("Error creating product", { variant: "error" });
    }
  };




  return (
    <div className="bg-white rounded-md">
      {/* HEADER */}
      <div className="border-b px-8 h-20 flex items-center">
        <h1 className="text-xl font-semibold">Create Product</h1>
      </div>

      {/* FORM */}
      <div className="p-8">
        <div className="mb-6">
          <ImageUpload
            files={files}
            setFiles={setFiles}
          />
        </div>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            original_price: "",
            images: "",
            badge: "",
            sizes: "",
            stock: '',
            category: "",
            skin_type: "",
            is_active: true,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, setFieldValue }) => (

            <Form className="space-y-6">

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Name */}
                <Field label="Product Name">
                  <Input name="name" value={values.name} onChange={handleChange} aria-label="Product Name" />
                </Field>

                {/* Category */}
                <Field label="Category">
                  <Input
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  />
                </Field>

                {/* Badge */}
                <Field label="Badge">
                  <Select
                    placeholder="Select badge"
                    selectedKeys={[values.badge]}
                    onChange={(e) => setFieldValue("badge", e.target.value)}
                  >
                    <SelectItem key="sale">Sale</SelectItem>
                    <SelectItem key="featured">Featured</SelectItem>
                    <SelectItem key="bestseller">Bestseller</SelectItem>
                    <SelectItem key="new">New</SelectItem>
                  </Select>
                </Field>

                {/* Price */}
                <Field label="Price">
                  <Input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </Field>

                {/* Original Price */}
                <Field label="Original Price">
                  <Input
                    type="number"
                    name="original_price"
                    value={values.original_price}
                    onChange={handleChange}
                  />
                </Field>



                {/* Stock */}
                <Field label="Stock">
                  <Input
                    type="number"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                  />
                </Field>

                {/* Sizes */}
                <Field label="Sizes (comma separated)">
                  <Input
                    name="sizes"
                    placeholder="45ml,75ml,100ml"
                    value={values.sizes}
                    onChange={handleChange}
                  />
                </Field>

                {/* Images */}
                <Field label="Images (comma separated URLs)">
                  <Input
                    name="images"
                    placeholder="img1.jpg,img2.jpg"
                    value={values.images}
                    onChange={handleChange}
                  />
                </Field>



                {/* Skin Type */}
                <Field label="Skin Type">
                  <Input
                    name="skin_type"
                    value={values.skin_type}
                    onChange={handleChange}
                  />
                </Field>

                {/* Active */}
                <div className="flex items-center gap-4 mt-6">
                  <Switch
                    isSelected={values.is_active}
                    onValueChange={(val) => setFieldValue("is_active", val)}
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
                  className="mt-2"
                />
              </div>

              <AccordionForm
                accordionData={accordionData}
                setAccordionData={setAccordionData}
              />

              {/* BUTTONS */}
              <div className="flex gap-4">
                <Button type="submit" color="primary">
                  Create Product
                </Button>
                <Button
                  variant="flat"
                  onClick={() => router.push("/dashboard/products")}
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

export default CreateProduct;

/* Field Wrapper */
const Field = ({ label, children }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-2">{children}</div>
  </div>
);