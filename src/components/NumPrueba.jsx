import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

const NumPrueba = () => {
  const { register } = useForm(); //Registrar cada input
  const [numeroDocumento, setNumeroDocumento] = useState("");

  const handleChangeNumeroDocumento = (event) => {
    const valor = event.target.value;
    if (!isNaN(valor) && !valor.includes(".")) {
      setNumeroDocumento(valor);
    }
  };
  return (
    <form style={{ backgroundColor: "#fff" }}>
      <TextField
        id="numero-documento-input"
        label="Número de documento"
        variant="outlined"
        value={numeroDocumento}
        onChange={handleChangeNumeroDocumento}
        sx={{ width: "180%" }}
        {...register("documento")}
      />
    </form>
  );
};

export default NumPrueba;
