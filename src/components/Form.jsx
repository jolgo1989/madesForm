import { Paper, TextField, Box, Autocomplete } from "@mui/material";
import React from "react";

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
  const [valor, setValor] = React.useState(null);

  // Manejador del cambio de valor
  const handleChange = (event, newValue) => {
    setValor(newValue);
  };

  return (
    <Paper
      sx={{
        mt: 8,
        px: 4,
        py: 2,
        maxWidth: 800,
        mx: "auto",
      }}
      elevation={3}
    >
      <form>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {/* Nombre */}
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            sx={{
              width: 1 / 2,
            }}
          />

          {/* Apellido */}
          <TextField
            id="outlined-basic"
            label="Apellido"
            variant="outlined"
            sx={{
              width: 1 / 2,
            }}
          />
        </Box>
        <Box>
          {/* Tipo de documento */}
          <Autocomplete
            id="selector-tipo"
            options={tipos}
            getOptionLabel={(option) => option.label}
            value={valor}
            onChange={handleChange}
            // style={{ width: 300 }}
            sx={{
              mt: 4,
              width: 1 / 2,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de documento"
                variant="outlined"
              />
            )}
          />
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
