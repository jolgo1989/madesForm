import React, { useEffect } from "react";
import { FaRegUser } from "react-icons/fa"; // Importar imagen desde react-icons
import { useForm, Controller } from "react-hook-form"; // Importa el hook useForm desde la librería react-hook-form
import { useTheme } from "@mui/material/styles";
import Date from "./Date";
import { Paper, TextField, Box, Autocomplete, Button } from "@mui/material";

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
      //valores iniciales de los camponentes
      nombre: "",
      apellido: "",
      tipoDocumento: "",
      documento: "",
      telFijo: "",
      celular: "",
      direccion: "",
      correoUno: "",
      correoDos: "",
    },
  });

  //Mostrar error al enviar el formulario vacio
  console.log(errors);

  //Funcion para obtener los datos del formulario
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  // Usa useEffect para restablecer el formulario cuando se envíe con éxito
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const theme = useTheme(); // Obtener el objeto de tema usando el hook useTheme

  return (
    <Paper //Contenedor para mostrar contenido en una superficie elevada
      sx={{
        //Spacing (https://mui.com/system/spacing/)
        mt: 8,
        px: 4,
        py: 2,
        maxWidth: 850,
        mx: "auto",
      }}
      elevation={3}
    >
      <form onSubmit={onSubmit}>
        <Box //contenedor genérico
          //Definir estilos personalizados
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            // Breakpoints (https://mui.com/material-ui/customization/breakpoints/)
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              fontSize: 130,
              my: 2,
              [theme.breakpoints.up("sm")]: {
                order: 1,
              },
            }}
          >
            <FaRegUser /> {/* Imagen */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Alinear los elementos en una fila
              gap: 2,
              width: "100%",
              mr: 4,
              [theme.breakpoints.down("sm")]: {
                mr: 0,
              },
            }}
          >
            {/* Nombre */}
            <TextField //Campos de texto
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
            mt: 2,
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
              mt: 0,
            },
          }}
        >
          {/* Tipo de documento */}
          <Controller
            name="tipoDocumento"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                sx={{
                  width: "100%",
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
          {/* Telefono */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
            mt: 2,
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
          }}
        >
          {/*Teléfono fijo*/}
          <TextField
            sx={{ width: "100%" }}
            id="telefono-fijo-input"
            label="Teléfono fijo"
            variant="outlined"
            {...register("telFijo", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Utilice solo caracteres numéricos",
              },
              validate: (value) => {
                if (value.length !== 10) {
                  return "Ingrese el indicativo de su ciudad seguido de su número de teléfono fijo.";
                }
                return true; // Retornar true si la validación es exitosa.
              },
            })}
            onKeyUp={() => {
              trigger("telFijo");
            }}
            error={errors.telFijo}
            helperText={errors.telFijo?.message}
          />
          {/*Celular*/}
          <TextField
            sx={{ width: "100%" }}
            id="celular-input"
            label="Celular"
            variant="outlined"
            {...register("celular", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Utilice solo caracteres numéricos",
              },
              validate: (value) => {
                if (value.length !== 10) {
                  return "Ingrese un número de celular de 10 dígitos.";
                }
                return true; // Retornar true si la validación es exitosa.
              },
            })}
            onKeyUp={() => {
              trigger("celular");
            }}
            error={errors.celular}
            helperText={errors.celular?.message}
          />
        </Box>
        {/* Dirección */}
        <TextField
          sx={{
            width: "100%",
            mt: 2,
          }}
          id="nombre-input"
          label="Dirección *"
          variant="outlined"
          {...register("direccion", {
            required: "Campo requerido",
          })}
          onKeyUp={() => {
            trigger("direccion");
          }}
          error={errors.direccion}
          helperText={errors.direccion?.message}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
            mt: 2,
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
          }}
        >
          {/*Correo principal*/}
          <TextField
            sx={{
              width: "100%",
            }}
            id="nombre-input"
            label="Correo principal *"
            variant="outlined"
            {...register("correoUno", {
              required: {
                value: true,
                message: "El campo requerido", // mensaje personalizado
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no valido",
              },
            })}
            error={errors.correoUno} // asignar el error al atributo error
            helperText={errors.correoUno?.message} // mostrar el mensaje de error
            onKeyUp={() => {
              trigger("correoUno");
            }}
          />

          {/*Correo secundario*/}
          <TextField
            sx={{
              width: "100%",
            }}
            id="nombre-input"
            label="Correo secundario *"
            variant="outlined"
            {...register("correoDos", {
              required: {
                value: true,
                message: "El campo requerido", // mensaje personalizado
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no valido",
              },
            })}
            error={errors.correoDos} // asignar el error al atributo error
            helperText={errors.correoDos?.message} // mostrar el mensaje de error
            onKeyUp={() => {
              trigger("correoDos");
            }}
          />
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{
            my: 2,
          }}
        >
          Enviar
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
