import React, { useState } from "react";
import "./Form.css";
import { Paper, TextField, Box, Autocomplete } from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaRegUser } from "react-icons/fa";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useForm } from "react-hook-form";

// Opciones de tipo de documento
const tipos = [
  { label: "Tarjeta de identidad", value: "TI" },
  { label: "Cedula ciudadanía", value: "CC" },
  { label: "Cedula extranjería", value: "CE" },
  { label: "Pasaporte", value: "PA" },
];

const Form = () => {
  // Estado del valor seleccionado
  const [valor, setValor] = useState(null);

  // Manejador del cambio de valor
  const handleChange = (event, newValue) => {
    setValor(newValue);
  };

  // TextField solo numero
  const [numero, setNumero] = useState("");

  const handleChangeNumero = (event) => {
    setNumero(event.target.value);
  };

  const validarNumero = (event) => {
    const valor = event.target.value;
    if (isNaN(valor) || valor.includes(".")) {
      // No es un número válido
      event.target.value = numero; // Restaurar el valor anterior
    } else {
      // Es un número válido
      handleChangeNumero(event); // Actualizar el estado
    }
  };

  // Estado para guardar la fecha seleccionada
  const [date, setDate] = useState("");

  // Función para manejar el cambio de fecha
  const handleChangeFecha = (event) => {
    setDate(event.target.value);
  };

  return (
    <Paper
      sx={{
        mt: 8,
        px: 4,
        py: 2,
        maxWidth: 1000,
        mx: "auto",
      }}
      elevation={3}
    >
      <form className="form">
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
          />

          <TextField
            id="apellido-input"
            label="Apellido"
            variant="outlined"
            sx={{ width: "180%" }}
          />

          {/* Tipo de documento */}
          <Autocomplete
            id="selector-tipo"
            options={tipos}
            getOptionLabel={(option) => option.label}
            value={valor}
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
            id="numero-input"
            label="Número de documento"
            variant="outlined"
            value={numero}
            onChange={validarNumero}
            sx={{ width: "180%" }}
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
          <FaRegUser className="userIcon" />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Alinear los elementos en una fila
              gap: 2,
            }}
          >
            <TextField
              id="numero-input"
              label="Telefono fijo"
              variant="outlined"
              value={numero}
              onChange={validarNumero}
              sx={{
                width: "70%", // Ocupar el 50% del ancho del contenedor
              }}
            />

            <TextField
              id="numero-input"
              label="Celular"
              variant="outlined"
              value={numero}
              onChange={validarNumero}
              sx={{
                width: "70%", // Ocupar el 50% del ancho del contenedor
              }}
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
                Gender
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
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
