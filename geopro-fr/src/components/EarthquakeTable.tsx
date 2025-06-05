import { useContext, useState } from "react";
import EarthquakeDataContext from "./EarthquakeContext";

const EarthquakeTable = ({ page, setPage }) => {
  const data = useContext(EarthquakeDataContext);
  const [tablePage, setTablePage] = useState(page);
  const [displayData, setDisplayData] = useState(paginate(data, tablePage));

  const dataStyle = {
    fontSize: "10px",
  };

  function paginate(dataArr, pageNumber: number, pageSize = 10) {
    const startIndex = pageNumber * pageSize + 1;
    const endIndex = startIndex + pageSize;
    const newCollection = dataArr.slice(startIndex, endIndex);
    return newCollection;
  }

  const handlePrevPage = () => {
    setTablePage(tablePage <= 1 ? tablePage : tablePage - 1);
    setPage(tablePage);
    setDisplayData(paginate(data, tablePage));
  };

  const handleNextPage = () => {
    (tablePage < data.length / 10)
      ? setTablePage(tablePage + 1)
      : setTablePage(tablePage);
    setPage(tablePage);
    setDisplayData(paginate(data, tablePage));
  };

  const calculateDateString = (dateInMilliseconds) => {
    const date = new Date(dateInMilliseconds);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className="w-1/2">
      <div>Tabulated Data</div>
      <table className="w-full text-left table-auto" height={400}>
        <tbody>
          <tr className="text-[10px]">
            <th>Time of Occurance</th>
            <th>Place of happening</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Depth</th>
            <th>Magnitude</th>
            <th>NST</th>
          </tr>
          {displayData.map((record) => (
            <tr id={record.id} key={record.id}>
              {/* <td style={dataStyle}>{Date.parse(record.time)}</td> */}
              <td style={dataStyle}>
                {calculateDateString(Date.parse(record.time))}
              </td>
              <td style={dataStyle}>{record.place}</td>
              <td style={dataStyle}>
                {Math.round(record.latitude * 100) / 100}
              </td>
              <td style={dataStyle}>
                {Math.round(record.longitude * 100) / 100}
              </td>
              <td style={dataStyle}>{Math.round(record.depth * 100) / 100}</td>
              <td style={dataStyle}>{Math.round(record.mag * 100) / 100}</td>
              <td style={dataStyle}>{Math.round(record.nst * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center gap-4 mt-10">
        <button onClick={handlePrevPage}>Prev</button>
        <p className="text-2">{tablePage}</p>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default EarthquakeTable;
