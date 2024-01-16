import React from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";

import dayjs from "dayjs";

const startOfQ12022 = dayjs("1900-01-01T00:00:00.000");
const endOfQ12022 = dayjs("2099-12-31T23:59:59.999");

const DateComponent = () => {
  const [error, setError] = React.useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ backgroundColor: "#fff", marginTop: "25px" }}
    >
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
              //  defaultValue={dayjs("2022-07-17")}
              name="date"
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

      {errors.selectedDate && <span>{errors.selectedDate.message}</span>}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DateComponent;
// https://jasonwatmore.com/react-hook-form-7-date-validation-example-in-react
