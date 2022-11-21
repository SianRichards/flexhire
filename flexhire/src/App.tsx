import React, { useEffect, useState } from "react";
import "./App.css";
import fetchFlexhireData from "./apiCalls";
import { currentUserQuery, jobQuery } from "./queryTypes";
import ApiKeyForm from "./components/Form";
import Profile from "./components/Profile";
import Job from "./components/Job";
import { ICurrentUser, IJobs } from "./Types";
import Candidate from "./components/Candidate";

function App() {
  const [profileInformation, setProfileInformation] = useState<
    Partial<ICurrentUser>
  >({});
  const [jobInformation, setJobInformation] = useState<Partial<IJobs>>({});
  const [userDoesNotExistMessage, setUserDoesNotExistMessage] = useState("");
  const [formValue, setFormValue] = useState("");

  const getProfileData = async (apiKey: string) => {
    const currentUserInfo = await fetchFlexhireData(currentUserQuery, apiKey);
    setProfileInformation(currentUserInfo);
  };
  const getJobData = async (apiKey: string) => {
    const jobInfo = await fetchFlexhireData(jobQuery, apiKey);
    setJobInformation(jobInfo);
  };

  useEffect(() => {
    if (profileInformation.data?.currentUser === null) {
      setUserDoesNotExistMessage(
        "Unable to find a user associated with this API key. Please try another key."
      );
    } else setUserDoesNotExistMessage("");
  }, [profileInformation]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getProfileData(formValue);
    getJobData(formValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ApiKeyForm
          formValue={formValue}
          setFormValue={setFormValue}
          handleSubmit={handleSubmit}
        />
        <p>{userDoesNotExistMessage}</p>
        {profileInformation.data?.currentUser && (
          <Candidate profileInformation={profileInformation} />
        )}
        {jobInformation.data && jobInformation.data.contracts.nodes.length > 0 && (
          <>
            <h2>Jobs</h2>
            {jobInformation.data.contracts.nodes.map((job) => {
              return <Job job={job} />;
            })}
          </>
        )}
        {profileInformation.data?.currentUser && (
          <Profile profileInformation={profileInformation} />
        )}
      </header>
    </div>
  );
}

export default App;
