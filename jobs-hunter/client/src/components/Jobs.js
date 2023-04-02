import React, { useState } from "react";
import Job from "./Job";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Jobs = ({ jobs }) => {
  const stepSize = 5;
  const maxSteps = Math.floor(jobs.length / stepSize);

  const [activeStep, setActiveStep] = useState(0);
  // const [activeJobs, setActiveJobs] = useState(
  //   jobs.slice(activeStep * stepSize, activeStep * stepSize + stepSize)
  // );
  // console.log(activeStep * stepSize, activeStep * stepSize + stepSize);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      console.log(prevActiveStep);
      return prevActiveStep + 1;
    });
    // updateActiveJobs();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // updateActiveJobs();
  };

  // const updateActiveJobs = () => {
  //   setActiveJobs((prevState) => {
  //     console.log(activeStep);
  //     return jobs.slice(
  //       (activeStep + 1) * stepSize,
  //       (activeStep + 1) * stepSize + stepSize
  //     );
  //   });
  // };

  return (
    <>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
      {jobs
        .slice(activeStep * stepSize, activeStep * stepSize + stepSize)
        .map((job, index) => (
          <Job job={job} key={index} />
        ))}
    </>
  );
};

export default Jobs;
