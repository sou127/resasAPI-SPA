import React, {useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";
import "./Plot.css";

const requestOptions = {
  method: "GET",
  headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
};

export default function Plot() {
  const [prefecturesList, setPrefecturesList] = useState([]);
  const [checkedPrefectures, setCheckedPrefectures] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [refreshState, setRefreshState] = useState([1]);

  // fetching Prefectures List
  useEffect(() => {
    fetch(process.env.REACT_APP_PREF_URL, requestOptions)
    .then(response => response.json())
    .then((data) => {
      setPrefecturesList(data.result);
    })
    .catch((err) => console.log(err));
  },[]);

  // fetching checkedPrefectures and Population Data
  useEffect(() => {
      for(var i=0;i<checkedPrefectures.length;i++){
        var code = checkedPrefectures[i].prefCode;
        var name = checkedPrefectures[i].prefName;
        fetch(process.env.REACT_APP_POPU_URL+checkedPrefectures[i].prefCode, requestOptions)
        .then(response => response.json())
        .then((data) => {
          setPlotData([...plotData, 
            {
              color: "red",
              prefCode: code,
              prefName: name,
              data: data.result.data[0].data,
            }]);
        })
        .catch((err) => console.log(err));
      }
  }, [refreshState]);

  // oncheck handle function
  async function handleEvent (e) {
    if (e.target.checked) {
      setCheckedPrefectures([
        ...checkedPrefectures,
        {
          prefCode: e.target.className,
          prefName: e.target.value
        },
      ]);
      setRefreshState([0]);
    } else {
        setCheckedPrefectures(
          checkedPrefectures.filter((data) => data.prefCode !== e.target.className),
        );
        setPlotData(
          plotData.filter((data) => data.prefCode !== e.target.className),
        );
    }
  }

  return (
    <div className="App">
      <div className="out-container">
        <h2>都道府県</h2>
        <div className="container">
          {prefecturesList && prefecturesList.map((record, pos) => {
            return (
              <div key={pos}>
                <input 
                  type="checkbox" 
                  className={`${record.prefCode}`} 
                  onChange={(e) => handleEvent(e)} 
                  value={record.prefName}
                >
                </input>
                <label>{record.prefName}</label>
              </div>
            );
        })}
        </div>
      </div>

      <div className="graph-div">
        {plotData.length!==0 &&
        <ResponsiveContainer width="95%" height={300}>
          <LineChart
            width={500}
            height={300}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis padding={{ right: 20 }} dataKey="year" type="year" allowDuplicatedCategory={false}>
              <Label
                value="年度"
                position="right"
                style={{ textAnchor: "middle" }}
              />
            </XAxis>
            <YAxis tickFormatter={(e) => {return (e/1000000);}}>
              <Label
                value="総人口 (Million)"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Legend />
              {plotData.map((record, pos) => {
                return (
                  <Line type="monotone" key={pos} data={record.data} name={record.prefName} dataKey="value" stroke={"#"+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)} />
                );
              })}
          </LineChart>
          </ResponsiveContainer>
        }
      </div>

    </div>
  );
}