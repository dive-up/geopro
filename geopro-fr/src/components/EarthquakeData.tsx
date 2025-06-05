import EarthquakeChart from "./EarthquakeChart";
import EarthquakeTable from "./EarthquakeTable";
import EarthquakeDataContext from "./EarthquakeContext";
import data from "../jsonFormatData.json";
import { useState } from "react";

const EarthquakeData = () => {
  const earthquakeData = data;
  const [page, setPage] = useState(1);

  return (
    <div className="px-[80px] flex flex-col my-9">
      <div className="flex justify-between gap-8">
        <EarthquakeDataContext value={earthquakeData}>
          <EarthquakeChart page={page} setPage={setPage} />
          <EarthquakeTable page={page} setPage={setPage} />
        </EarthquakeDataContext>
      </div>
    </div>
  );
};

export default EarthquakeData;
