import React from "react";

const Job = (props: any) => {
  const { job } = props;
  return (
    <div>
      <p>Title: {job.job.title}</p>
      <p>Company: {job.firm.name}</p>
      <p>Hiring Manager: {job.client.name}</p>
    </div>
  );
};

export default Job;
