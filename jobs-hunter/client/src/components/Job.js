import { Paper, Typography } from "@mui/material";
import React from "react";

const getLocation = (arr) => {
  if (!arr) {
    return "Not Specified";
  }
  if (arr.length === 0) {
    return "Remote";
  }
  return arr[0];
};

const Job = ({ job }) => {
  return (
    <Paper>
      <div className="job">
        <div className="left">
          <Typography variant="button">{job.companyName}</Typography>
          <Typography variant="h5">{job.title}</Typography>
          <Typography variant="caption">
            {getLocation(job.locationRestrictions)}
          </Typography>
        </div>
        <div className="right">
          <Typography variant="caption" display="block" gutterBottom>
            {new Date(job.pubDate).toUTCString()}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            |
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {new Date(job.expiryDate).toUTCString()}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Job;
