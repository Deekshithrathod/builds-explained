import "./App.css";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import data from "./data";
import Jobs from "./components/Jobs";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const override = {
    display: "block",
    margin: "30% auto",
    borderColor: "red",
  };
  // async function fetchData() {
  // const res = await fetch("http://localhost:4000/jobs");
  // const data = await res.json();
  // setJobs(data);
  // setLoading((prevState) => !prevState);
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      // fetchData();
      setJobs(data);
      setLoading((prevState) => !prevState);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Typography variant="h1" gutterBottom>
        Entry Level Jobs
      </Typography>
      <div className="container">
        {loading ? (
          <PuffLoader size={100} cssOverride={override} />
        ) : (
          <Jobs jobs={jobs} />
        )}
      </div>
    </div>
  );
}

export default App;
