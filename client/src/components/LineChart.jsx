import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartData, setTime }) => {
  const handleChange = (e) => {
    setTime(e.target.value);
  }

  return (
    <Box>
      <FormControl size="small" style={{ width: "100px" }} color="secondary">
        <InputLabel>Time</InputLabel>
        <Select
          defaultValue={"24h"}
          label="Time"
          onChange={handleChange}
        >
          <MenuItem value={"24h"}>24h</MenuItem>
          <MenuItem value={"7d"}>Week</MenuItem>
          <MenuItem value={"30d"}>Month</MenuItem>
        </Select>
      </FormControl>
      {chartData && <Line data={chartData} />}
    </Box>
  )
}

export default LineChart;