import { useEffect, useState } from "react";
import Quotecard from "./Components/Quotecard";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

const allAdvices = [];

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    setIsLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const result = await response.json();
    setData(result?.slip?.advice);
    allAdvices.push(result?.slip?.advice);
    setIsLoading(false);
  }

  function handlePrev() {
    setIsLoading(true);
    setTimeout(() => {
      setData(allAdvices[allAdvices.indexOf(data) - 1]);
      setIsLoading(false);
    }, 500);
  }

  async function handleDownload() {
    const canvas = await html2canvas(document.getElementById("qouteCard"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "advice.png", "image/png");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <Quotecard data={data} isLoading={isLoading} />
      <div className="buttons">
        <button
          disabled={allAdvices[allAdvices.indexOf(data) - 1] ? false : true}
          className="btn"
          onClick={handlePrev}
        >
          &larr;
        </button>
        <button className="btn" onClick={handleDownload}>
          &darr;
        </button>
        <button className="btn" onClick={getData}>
          &rarr;
        </button>
      </div>
      <h3 className="footer">Made With ❣️ By Rajat Sonaniya</h3>
    </div>
  );
}

export default App;
