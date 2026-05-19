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
  const [files, setFiles] = useState<any[]>([]);
  const [accordionData, setAccordionData] = useState([]);


  const imagesURL = files && files?.map((item, index) => (item?.image_url))
  const handleSubmit = async (values: any) => {
    try {
      console.log(values.badge_type, 'values.badge_type');

      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          name: values.name,
          category: values.category,
          images: imagesURL,
          description: values.description,
          price: values.price,
          original_price: values.original_price,
          badge: values.badge,
          stock: values.stock,
          is_active: values.is_active,
          product_details: accordionData,
          badge_type: values.badge_type,
          p_images: files
        }),
      });

      if (res.ok) {
        enqueueSnackbar("Product created successfully", { variant: "success" });
        router.push("/admin/product");
      }
    } catch (err) {
      enqueueSnackbar("Error creating product", { variant: "error" });
    }
  };

  console.log(files, 'files');
  console.log(
    files && files?.map((item, index) => (item?.image_url))
    , 'filesfiles');

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
            badge_type: "",
            badge: "",
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
                  <Input name="name" value={values.name} onChange={handleChange} aria-label="Product Name" placeholder="Enter product name" />
                </Field>

                {/* Category */}
                <Field label="Category">
                  <Input
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    placeholder="Enter category name"
                  />
                </Field>




                {/* Price */}
                <Field label="Selling Price">
                  <Input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="Enter selling price ₹ 499"
                  />
                </Field>

                {/* Original Price */}
                <Field label="Original Price">
                  <Input
                    type="number"
                    name="original_price"
                    value={values.original_price}
                    onChange={handleChange}
                    placeholder="Enter original price ₹ 899"
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

                {/* Sizes */}
                {/* Badge */}
                <Field label="Badge Type">
                  <Select
                    // label=""
                    aria-labelledby="Badge Type"
                    name="badge_type"
                    placeholder="Select badge"
                    selectedKeys={values.badge_type ? [values.badge_type] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      setFieldValue("badge_type", value);
                    }}
                  >
                    <SelectItem key="sale">Sale</SelectItem>
                    <SelectItem key="featured">Featured</SelectItem>
                    <SelectItem key="bestseller">Bestseller</SelectItem>
                    <SelectItem key="new">New</SelectItem>
                  </Select>
                </Field>

                {/* Images */}
                <Field label="Badge">
                  <Input
                    name="badge"
                    placeholder="Enter badge name"
                    value={values.badge}
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
                  placeholder="Enter description"
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

export default CreateProduct;

/* Field Wrapper */
const Field = ({ label, children }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-2">{children}</div>
  </div>
);