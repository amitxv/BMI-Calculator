import {
  Button,
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
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [computedBMI, setComputedBMI] = useState(0);
  const [range, setRange] = useState("");

  const calculateBMI = () => {
    // return early if values are invalid
    if (!(weight && height)) {
      setComputedBMI(0);
      return;
    }

    // calculate BMI
    let BMI = 0;
    if (isMetric) {
      const heightInMeters = height / 100;
      BMI = weight / (heightInMeters ** 2);
    } else {
      const heightInInches = height / 2.54;
      BMI = (703 * weight) / (heightInInches ** 2);
    }
    setComputedBMI(BMI);

    // calculate range
    if (BMI < 18.5) {
      setRange("underweight");
    } else if (BMI < 24.9) {
      setRange("healthy");
    } else if (BMI < 29.9) {
      setRange("overweight");
    } else if (BMI > 30) {
      setRange("obese");
    }
  };

  useEffect(calculateBMI, [isMetric]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={2} p={3}>
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label={`Weight${isMetric ? " (kg)" : " (lbs)"}`}
            variant="outlined"
            onChange={(e) => setWeight(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label={`Height${isMetric ? " (cm)" : " (inches)"}`}
            variant="outlined"
            onChange={(e) => setHeight(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={calculateBMI}
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12}>
          {computedBMI > 0 ? `Your BMI is ${computedBMI.toFixed(2)} which is classed as ${range}` : ""}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
