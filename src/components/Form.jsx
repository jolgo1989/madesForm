import React, { useState } from "react";
import "./Form.css";
import { FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form"; // Importa el hook useForm desde la librería react-hook-form
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
    formState: { errors }, // Objeto que contiene los errores del formulario
    trigger,
    reset, // Función para restablecer los valores del formulario
  } = useForm();

  //! Atento a esto creo que se debe quitar
  console.log(errors);

  //Funcion para obtener los datos del formulario
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  // Estado del valor seleccionado
  const [valorSeleccion, setValor] = useState(null);

  // Manejador del cambio de valor
  const handleChange = (event, newValue) => {
    //!Pendiente con el metodo event
    setValor(newValue);
  };

  //! TextField solo numero Analizarlo

  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [celular, setCelular] = useState("");

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
      <form onSubmit={onSubmit}>
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
              id="nombre-input" //Proporciona un identificador único al TextField.
              label="Nombre *" //Etiqueta que se muestra sobre el TextField para indicar qué tipo de información se espera.
              variant="outlined" //ndica el estilo de diseño del TextField, en este caso, "outlined".
              {...register("nombre", {
                //required: Indica que el campo es obligatorio.
                required: {
                  value: true,
                  message: "El campo nombre es obligatorio", // Mensaje personalizado si no se proporciona un nombre
                },
                minLength: {
                  value: 3,
                  message: "Ingrese al menos 3 caracteres para el nombre.", // Mensaje si el nombre es demasiado corto
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Use solo letras en el nombre", // Mensaje si se ingresan caracteres no permitidos
                },
              })}
              error={errors.nombre} // Propiedad para asignar el estado de error al TextField
              helperText={errors.nombre?.message} // Mensaje de ayuda que muestra el mensaje de error personalizado
              sx={{
                width: "180%", //Propiedad de estilo para establecer el ancho del TextField.
              }}
            />

            <TextField
              id="apellido-input"
              label="Apellido *"
              variant="outlined"
              sx={{ width: "180%" }}
              {...register("apellido", {
                required: "El campo apellido es obligatorio", // mensaje personalizado
              })}
              error={errors.apellido} // asignar el error al atributo error
              helperText={errors.apellido?.message} // mostrar el mensaje de error
            />
            {/* Tipo de documento */}
            <Autocomplete
              id="selector-tipo"
              options={tipos}
              getOptionLabel={(option) => option.label}
              // value={valorSeleccion}
              // onChange={handleChange}
              sx={{}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de documento"
                  variant="outlined"
                  // {...register("tipoDeDocumento")}
                />
              )}
            />
            {/*//! Número de documento */}
            <TextField
              id="numero-documento-input"
              label="Número de documento *"
              variant="outlined"
              sx={{ width: "180%" }}
              {...register("documento", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Ingrese solo numeros",
                },
                required: {
                  value: true,
                  message: "Campo documento es obligatorio",
                },
                minLength: {
                  value: 8,
                  message: "Campo cedula debe tener al menos 8 digitos",
                },
                maxLength: {
                  value: 10,
                  message: "Campo cedula debe tener máximo 10 digitos",
                },
              })}
              onKeyUp={() => {
                trigger("documento");
              }}
              error={errors.documento} // asignar el error al atributo error
              helperText={errors.documento?.message} // mostrar el mensaje de error
            />

            <TextField
              id="nombre-input"
              label="Dirección *"
              variant="outlined"
              sx={{
                width: "180%",
              }}
              {...register("direccion", {
                required: "El campo dirección es obligatorio", // mensaje personalizado
              })}
              error={errors.direccion} // asignar el error al atributo error
              helperText={errors.direccion?.message} // mostrar el mensaje de error
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
              {/*//! Telefono */}
              <TextField
                id="telefono-fijo-input"
                label="Teléfono fijo"
                variant="outlined"
                value={telefonoFijo}
                onChange={handleChangeTelefonoFijo}
                sx={{ width: "70%" }}
                // {...register("telefonoFijo")}
              />

              <TextField
                id="celular-input"
                label="Celular"
                variant="outlined"
                value={celular}
                onChange={handleChangeCelular}
                sx={{ width: "70%" }}
                // {...register("celular")}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Alinear los elementos en una fila
                gap: 2,
              }}
            >
              {/* Compoenente fecha de nacimiento */}
              <Date control={control} errors={errors} />

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
                label="Correo principal *"
                variant="outlined"
                {...register("correoUno", {
                  required: {
                    value: true,
                    message: "El campo correo principal es obligatorio", // mensaje personalizado
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo no valido",
                  },
                })}
                error={errors.correoUno} // asignar el error al atributo error
                helperText={errors.correoUno?.message} // mostrar el mensaje de error
                sx={{
                  width: "180%",
                }}
              />

              <TextField
                id="nombre-input"
                label="Correo secundario *"
                variant="outlined"
                {...register("correoDos", {
                  required: {
                    value: true,
                    message: "El campo correo secundario es obligatorio", // mensaje personalizado
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo no valido",
                  },
                })}
                error={errors.correoDos} // asignar el error al atributo error
                helperText={errors.correoDos?.message} // mostrar el mensaje de error
                sx={{
                  width: "180%",
                }}
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
