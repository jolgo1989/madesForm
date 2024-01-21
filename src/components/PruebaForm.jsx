import { FaRegUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form"; // Importa el hook useForm desde la librería react-hook-form
import { useTheme } from "@mui/material/styles";
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

  const theme = useTheme();

  return (
    <Paper
      sx={{
        mt: 8,
        px: 4,
        py: 2,
        maxWidth: 850,
        mx: "auto",
      }}
      elevation={3}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            display: "flex",
            fontSize: 130,
            my: 2,
            [theme.breakpoints.up("md")]: {
              order: 1,
            },
          }}
        >
          <FaRegUser />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Alinear los elementos en una fila
            gap: 2,
            width: "100%",
            mr: 4,
            [theme.breakpoints.down("md")]: {
              mr: 0,
            },
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
        </Box>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 2,
          my: 2,
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
        }}
      >
        <Controller
          name="tipoDocumento"
          control={control}
          rules={{ required: "Campo requerido" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              sx={{
                width: "100%",
                // maxWidth: 350,
              }}
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
        {/* Numeros de documento */}
        <TextField
          sx={{
            width: "100%",
          }}
          id="numero-documento-input"
          label="Número de documento *"
          variant="outlined"
          {...register("documento", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Utilice solo caracteres numéricos",
            },
            //  validación personalizada del valor ingresado en un campo de formulario

            validate: (value) => {
              if (value.length < 4 || value.length > 10) {
                return "Solo se acepta números, máximo 10 caracteres";
              }
              return true; // Retornar true si la validación es exitosa.
            },
          })}
          onKeyUp={() => {
            trigger("documento");
          }}
          error={errors.documento}
          helperText={errors.documento?.message}
        />

        {/* Compoenente fecha de nacimiento */}
        <Date control={control} errors={errors} />
      </Container>
    </Paper>
  );
};

export default PruebaForm;
