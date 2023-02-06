import {
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isMetric, setIsMetric] = useState(true);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [computedBMI, setComputedBMI] = useState(-1);
  const [range, setRange] = useState("");

  useEffect(() => {
    if (weight && height) {
      let BMI = 0;
      if (isMetric) {
        const heightInMeters = height / 100;
        BMI = weight / heightInMeters ** 2;
      } else {
        const heightInInches = height / 2.54;
        BMI = (703 * weight) / heightInInches ** 2;
      }
      setComputedBMI(BMI);
    } else {
      setComputedBMI(-1);
    }
  }, [weight, height, isMetric]);

  useEffect(() => {
    if (computedBMI < 18.5) {
      setRange("underweight");
    } else if (computedBMI < 24.9) {
      setRange("healthy");
    } else if (computedBMI < 29.9) {
      setRange("overweight");
    } else if (computedBMI > 30) {
      setRange("obese");
    }
  }, [computedBMI]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={2} p={2}>
        <Grid container item justifyContent="center">
          <Typography variant="h4">BMI Calculator</Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-start">
          <RadioGroup
            row
            value={isMetric ? "metric" : "imperial"}
            onChange={(event) => {
              setIsMetric(event.target.value === "metric");
            }}
          >
            <FormControlLabel
              value="metric"
              control={<Radio />}
              label="Metric"
            />
            <FormControlLabel
              value="imperial"
              control={<Radio />}
              label="Imperial"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required={!weight}
            error={!weight}
            id="outlined-basic"
            label={`Weight${isMetric ? " (kg)" : " (lbs)"}`}
            variant="outlined"
            onChange={(event) => setWeight(parseFloat(event.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required={!height}
            error={!height}
            id="outlined-basic"
            label={`Height${isMetric ? " (cm)" : " (inches)"}`}
            variant="outlined"
            onChange={(event) => setHeight(parseFloat(event.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          {computedBMI > -1 ? `Your BMI is ${computedBMI.toFixed(2)} which is classed as ${range}` : null}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
