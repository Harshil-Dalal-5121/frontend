import React from "react";

const DisplayProgressBar = ({ data }) => {
  const { progressSelect } = data;
  return (
    <>
      <div
        className="progress"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={
            progressSelect <= 30
              ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
              : progressSelect > 30 && progressSelect <= 50
              ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
              : progressSelect > 50 && progressSelect <= 80
              ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
              : "progress-bar progress-bar-striped progress-bar-animated bg-success"
          }
          style={{ width: `${progressSelect || "0"}% ` }}
        ></div>
        {progressSelect || "0"}%{" "}
      </div>
    </>
  );
};

export default DisplayProgressBar;
