import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

const startOfQ12022 = dayjs("1900-01-01T00:00:00.000");
const endOfQ12022 = dayjs("2099-12-31T23:59:59.999");

const DateComponent = ({ control, errors }) => {
  const [error, setError] = React.useState(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "fecha invalida";
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
          message: "Campo requerido",
        },
      }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

export default DateComponent;
