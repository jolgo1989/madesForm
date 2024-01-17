import React from "react";
import { useForm } from "react-hook-form";
import DateComponent from "./DateComponent";

const FormPrueba = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }, // Obtén los errores del useForm
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ backgroundColor: "#fff", marginTop: "25px" }}
    >
      {/* Pasa el control y los errores como props al DateComponent */}
      <DateComponent control={control} errors={errors} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPrueba;
