import React, { useState } from "react";
import "./Form.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaRegUser } from "react-icons/fa";
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

import { useForm } from "react-hook-form";

// Opciones de tipo de documento
const tipos = [
  { label: "Tarjeta de identidad", value: "TI" },
  { label: "Cedula ciudadanía", value: "CC" },
  { label: "Cedula extranjería", value: "CE" },
  { label: "Pasaporte", value: "PA" },
];

const Form = () => {
  const { register, handleSubmit } = useForm(); //Registrar cada input

  // Estado del valor seleccionado
  const [valorSeleccion, setValor] = useState(null);

  // Manejador del cambio de valor
  const handleChange = (event, newValue) => {
    //!Pendiente con el metodo event
    setValor(newValue);
  };

  // TextField solo numero

  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [celular, setCelular] = useState("");

  const handleChangeNumeroDocumento = (event) => {
    const valor = event.target.value;
    if (!isNaN(valor) && !valor.includes(".")) {
      setNumeroDocumento(valor);
    }
  };

  const handleChangeTelefonoFijo = (event) => {
    const valor = event.target.value;
    if (!isNaN(valor) && !valor.includes(".")) {
      setTelefonoFijo(valor);
    }
  };

  const handleChangeCelular = (event) => {
    const valor = event.target.value;
    if (!isNaN(valor) && !valor.includes(".")) {
      setCelular(valor);
    }
  };

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
      <form
        onSubmit={handleSubmit(() => {
          console.log("Formulario enviado"); // función que se pasa al evento onSubmit y maneja la lógica del envío del formulario (por eso no se actualiza)
        })}
      >
        <div className="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Alinear los elementos en una fila
              gap: 2,
              //! flexWrap: "wrap", // Envolver a la siguiente línea si no hay espacio suficiente
            }}
          >
            {/* Nombre */}
            <TextField
              id="nombre-input"
              label="Nombre"
              variant="outlined"
              sx={{
                width: "180%",
              }}
              {...register("nombre")} //Todos los campos que devuelva la funcion register seran asignados a TextField
            />

            <TextField
              id="apellido-input"
              label="Apellido"
              variant="outlined"
              sx={{ width: "180%" }}
              {...register("Apellido")}
            />

            {/* Tipo de documento */}
            <Autocomplete
              id="selector-tipo"
              options={tipos}
              getOptionLabel={(option) => option.label}
              value={valorSeleccion}
              onChange={handleChange}
              sx={{}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de documento"
                  variant="outlined"
                />
              )}
            />

            {/* Número de documento */}
            <TextField
              id="numero-documento-input"
              label="Número de documento"
              variant="outlined"
              value={numeroDocumento}
              onChange={handleChangeNumeroDocumento}
              sx={{ width: "180%" }}
              {...register("numeroDocumento")}
            />

            <TextField
              id="nombre-input"
              label="Dirección"
              variant="outlined"
              sx={{
                width: "180%",
              }}
              {...register("direccion")}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Alinear los elementos en una fila
              gap: 2,
              //! flexWrap: "wrap", // Envolver a la siguiente línea si no hay espacio suficiente
            }}
          >
            {/* Imagen */}
            <div className="userIcon">
              <FaRegUser />
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Alinear los elementos en una fila
                gap: 2,
              }}
            >
              <TextField
                id="telefono-fijo-input"
                label="Teléfono fijo"
                variant="outlined"
                value={telefonoFijo}
                onChange={handleChangeTelefonoFijo}
                sx={{ width: "70%" }}
                {...register("telefonoFijo")}
              />

              <TextField
                id="celular-input"
                label="Celular"
                variant="outlined"
                value={celular}
                onChange={handleChangeCelular}
                sx={{ width: "70%" }}
                {...register("celular")}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Alinear los elementos en una fila
                gap: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Fecha de nacimiento" />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl>
                <FormLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Alinear los elementos en una fila
                  }}
                  id="demo-radio-buttons-group-label"
                >
                  Genero
                </FormLabel>
                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row", // Alinear los elementos en una fila
                  }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Otro"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Alinear los elementos en una fila
                gap: 2,
              }}
            >
              <TextField
                id="nombre-input"
                label="Correo#1"
                variant="outlined"
                sx={{
                  width: "180%",
                }}
                {...register("correo")}
              />

              <TextField
                id="nombre-input"
                label="Correo#2"
                variant="outlined"
                sx={{
                  width: "180%",
                }}
                {...register("correoDos")}
              />
            </Box>
          </Box>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </Paper>
  );
};

export default Form;
