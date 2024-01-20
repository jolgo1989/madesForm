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
  Container,
} from "@mui/material";

// Opciones de tipo de documento
const tipos = [
  { label: "Tarjeta de identidad", value: "TI" },
  { label: "Cedula ciudadanía", value: "CC" },
  { label: "Cedula extranjería", value: "CE" },
  { label: "Pasaporte", value: "PA" },
];

const PruebaForm = () => {
  // Utiliza el hook useForm para inicializar el control del formulario y gestionar su estado
  const {
    control, // Proporciona control sobre los campos del formulario
    register, // Función para registrar campos en el formulario
    handleSubmit, // Función que se llama al enviar el formulario
    formState: { errors }, // Objeto que contiene los errores del formulario
    trigger, // Función para activar la validación de todos los campos
    reset, // Función para restablecer los valores del formulario
  } = useForm();

  //! Atento a esto creo que se debe quitar
  // console.log(errors);

  //Funcion para obtener los datos del formulario
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

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
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Imagen */}
        <Box sx={{ fontSize: 120 }}>
          <FaRegUser />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Alinear los elementos en una fila

            gap: 2,
            width: 350,
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
                message: "Campo requerido", // Mensaje personalizado si no se proporciona un nombre
              },
              minLength: {
                value: 3,
                message: "Utilice al menos 3 caracteres para el nombre.", // Mensaje si el nombre es demasiado corto
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Utilice solo caracteres alfabéticos", // Mensaje si se ingresan caracteres no permitidos
              },
            })}
            // El evento onKeyUp activa la validación del campo "nombre" cada vez que se suelta una tecla.
            onKeyUp={() => {
              trigger("nombre");
            }}
            error={errors.nombre} // Propiedad para asignar el estado de error al TextField
            helperText={errors.nombre?.message} // Mensaje de ayuda que muestra el mensaje de error personalizado
          />
          {/* Apellido */}
          <TextField
            id="apellido-input"
            label="Apellido *"
            variant="outlined"
            {...register("apellido", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 3,
                message: "Utilice al menos 3 caracteres para el apellido.",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Utilice solo caracteres alfabéticos",
              },
            })}
            onKeyUp={() => {
              trigger("apellido");
            }}
            error={errors.apellido}
            helperText={errors.apellido?.message}
          />
          {/* Tipo de documento */}
        </Box>
      </Container>
    </Paper>
  );
};

export default PruebaForm;
