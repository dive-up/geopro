import { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  ScatterChart,
  XAxis,
  ZAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import EarthquakeDataContext from "./EarthquakeContext";

const EarthquakeChart = ({ page, setPage }) => {
  const data = useContext(EarthquakeDataContext);
  const [chartPage, setChartPage] = useState(page);
  const [displayData, setDisplayData] = useState(paginate(data, chartPage));

  function paginate(dataArr, pageNumber: number, pageSize = 10) {
    const startIndex = pageNumber * pageSize + 1;
    const endIndex = startIndex + pageSize;
    const newCollection = dataArr.slice(startIndex, endIndex);
    return newCollection;
  }

  useEffect(() => {
    setDisplayData(paginate(data, chartPage));
  }, [chartPage]);

  return (
    <ResponsiveContainer width="50%" height={400}>
      <ScatterChart
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mag" type="number" name="magnitude" />
        <YAxis dataKey="time" type="number" name="time" />
        <ZAxis dataKey="depth" type="number" name="depth" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          legendType="circle"
          line
          name="Time vs Magnitude vs Depth"
          data={displayData}
          fill="#fff"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default EarthquakeChart;
