import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import "dayjs/locale/ES"; // Importar libreria para cambiar idioma del calendario

const startOfQ12022 = dayjs("1900-01-01T00:00:00.000");
const endOfQ12022 = dayjs("2099-12-31T23:59:59.999");

const Date = ({ control, errors }) => {
  const [error, setError] = React.useState(null);

  const errorMessage = React.useMemo(() => {
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
    <Controller
      control={control}
      name="selectedDate"
      defaultValue={null}
      rules={{
        required: {
          value: true,
          message: "Campo obligatorio",
        },
      }}
      render={({ field }) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ES" /*Aplicar libreria para cambiar idiama a español*/
        >
          <DatePicker
            label="Fecha de nacimiento"
            {...field}
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errors.selectedDate
                  ? errors.selectedDate.message
                  : errorMessage,
                error: !!errors.selectedDate || errorMessage,
              },
            }}
            minDate={startOfQ12022}
            maxDate={endOfQ12022}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default Date;
