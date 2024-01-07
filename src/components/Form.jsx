import { Paper, TextField, Box } from "@mui/material";
import React from "react";

import { useForm } from "react-hook-form";

const Form = () => {
  return (
    <Paper
      sx={{
        mt: 8,
        px: 4,
        py: 2,
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
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            sx={{
              width: 1 / 2,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Apellido"
            variant="outlined"
            sx={{
              width: 1 / 2,
            }}
          />
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
