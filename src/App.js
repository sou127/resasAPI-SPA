import React, {useEffect, useState} from "react";
import "./App.css";

const requestOptions = {
  method: "GET",
  headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
};

function App() {
  const [prefecturesList, setPrefecturesList] = useState([]);
  const [checkedPrefectures, setCheckedPrefectures] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [refreshState, setRefreshState] = useState([1]);

  useEffect(() => {
    fetch(process.env.REACT_APP_PREF_URL, requestOptions)
    .then(response => response.json())
    .then((data) => {
      setPrefecturesList(data.result);
    })
    .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
      for(var i=0;i<checkedPrefectures.length;i++){
        var code = checkedPrefectures[i].prefCode;
        var name = checkedPrefectures[i].prefName;
        fetch(process.env.REACT_APP_POPU_URL+checkedPrefectures[i].prefCode, requestOptions)
        .then(response => response.json())
        .then((data) => {
          setPlotData([...plotData, 
            {
              prefCode: code,
              prefName: name,
              data: data.result.data[0].data,
            }]);
        })
        .catch((err) => console.log(err));
      }
  }, [refreshState]);

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

      <div>
          {plotData && plotData.map((record, pos) => {
            return(
              <div key={pos}>
                {/* <div>{record.prefName} {record.prefCode}</div> */}
                <div>{JSON.stringify(record)}</div>
              </div>
            );
          })}
{/* 
           {checkedPrefectures && checkedPrefectures.map((record, pos) => {
            return(
              <div key={pos}>{record.prefCode}</div>
            );
          })}  */}
      </div>

    </div>
  );
}

export default App;
