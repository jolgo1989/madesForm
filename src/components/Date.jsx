import React, { useState, useMemo } from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Establecer la localización en español

// Crear instancias de objetos dayjs para las fechas de inicio y fin del primer trimestre de 2022
const startOfQ11900 = dayjs("1900-01-01T00:00:00.000");
const endOfQ12099 = dayjs("2099-12-31T23:59:59.999");

const Date = ({ control, errors }) => {
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Seleccione una fecha entre 1900 y 2099";
      }

      case "invalidDate": {
        return "Fecha invalida";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  return (
    <Controller //Integrar el control del formulario (control) con componentes no controlados como el DatePicker
      control={control}
      name="selectedDate" // especifica el nombre del campo (name) y las
      defaultValue={null}
      //Rules:reglas de validación.
      rules={{
        required: {
          value: true,
          message: "Campo obligatorio",
        },
      }}
      render={(
        { field } //Fiel :objeto que contiene varias propiedades necesarias para conectar el componente DatePicker
      ) => (
        <LocalizationProvider // Proporciona el contexto de localización para adaptadores de fechas como AdapterDayjs y configura el idioma (adapterLocale) a español
          dateAdapter={AdapterDayjs}
          adapterLocale="es" /*Aplicar libreria para cambiar idiama a español*/
        >
          <DatePicker // Componente de selección de fechas
            label="Fecha de nacimiento"
            {...field}
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errors.selectedDate //  HelperText: mostrar un mensaje de ayuda o error
                  ? errors.selectedDate.message
                  : errorMessage,
                error: !!errors.selectedDate || errorMessage,
              },
            }}
            // Especificar los límites mínimos y máximos de las fechas seleccionables.
            minDate={startOfQ11900}
            maxDate={endOfQ12099}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default Date;
