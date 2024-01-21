import "./Form.css";
import React, { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form"; // Importa el hook useForm desde la librería react-hook-form
import Date from "./Date";
import {
  Paper,
  TextField,
  Box,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

// Opciones de tipo de documento
const tipos = [
  { label: "Tarjeta de identidad", value: "TI" },
  { label: "Cedula ciudadanía", value: "CC" },
  { label: "Cedula extranjería", value: "CE" },
  { label: "Pasaporte", value: "PA" },
];

const Form = () => {
  // Utiliza el hook useForm para inicializar el control del formulario y gestionar su estado
  const {
    control, // Proporciona control sobre los campos del formulario
    register, // Función para registrar campos en el formulario
    handleSubmit, // Función que se llama al enviar el formulario
    formState: { errors, isSubmitSuccessful }, // Objeto que contiene los errores del formulario
    trigger, // Función para activar la validación de todos los campos
    reset, // Función para restablecer los valores del formulario
  } = useForm({
    defaultValues: {
      tipoDocumento: "", // Valor inicial para el campo tipoDocumento
      // Añade aquí los valores iniciales para los demás campos
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  //! Atento a esto creo que se debe quitar
  // console.log(errors);

  //Funcion para obtener los datos del formulario

  return (
    <Paper
      sx={{
        mt: 8,
        px: 4,
        py: 2,
        maxWidth: 1100,
        mx: "auto",
      }}
      elevation={3}
    >
      <form onSubmit={onSubmit}>
        <div className="form">
          <Controller
            name="tipoDocumento"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                sx={{ width: "50%" }}
                id="selector-tipo"
                options={tipos}
                value={value}
                onChange={(e, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo de documento"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            )}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </Paper>
  );
};

export default Form;
