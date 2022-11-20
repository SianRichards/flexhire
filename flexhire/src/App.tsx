import React, { useEffect, useState } from "react";
import "./App.css";
import fetchFlexhireData from "./apiCalls";
import { currentUserQuery, jobQuery } from "./queryTypes";

interface ICurrentUser {
  data: {
    currentUser?: {
      name: string;
      avatarUrl: string;
      userSkills: [
        {
          experience: string;
          skill: {
            name: string;
          };
        }
      ];
      answers: [
        {
          question: {
            title: string;
            videoAnswer: {
              video: {
                url: string;
              };
            };
          };
        }
      ];
      email: string;
    };
  };
}

interface IJobs {
  data: {
    contracts: {
      nodes: [
        {
          client: {
            name: string;
          };
          contractRequests: {
            project: {
              title: string;
            };
          };
          firm: {
            name: string;
          };
          job: {
            title: string;
          };
        }
      ];
    };
  };
}

function App() {
  const [profileInformation, setProfileInformation] = useState<
    Partial<ICurrentUser>
  >({});
  const [jobInformation, setJobInformation] = useState<Partial<IJobs>>({});
  const [formValue, setFormValue] = useState("");
  const [userDoesNotExistMessage, setUserDoesNotExistMessage] = useState("")

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
      setUserDoesNotExistMessage("Unable to find a user associated with this API key. Please try another key.")
    }
    else setUserDoesNotExistMessage("")
  }, [profileInformation]);

  const handleSubmit = (event: any) => {
    event.preventDefault()
    getProfileData(formValue);
    getJobData(formValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Enter Flexhire API Key here:
            <input
              type="text"
              value={formValue}
              onChange={(event) => setFormValue(event?.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
        <p>{userDoesNotExistMessage}</p>
        {profileInformation.data?.currentUser && (
          <>
            <img
              src={profileInformation.data.currentUser.avatarUrl}
              className="App-logo"
            />
            <p>{profileInformation.data.currentUser.name}</p>
            <div>
              <h2>Skills</h2>
              {profileInformation.data.currentUser.userSkills.map(
                (userSkill) => {
                  return (
                    <>
                      <div>{userSkill.skill.name}</div>
                      <div>Level: {userSkill.experience}/5</div>
                    </>
                  );
                }
              )}
            </div>
            <div>
              {profileInformation.data.currentUser.answers.map((answer) => {
                return (
                  <>
                    <div>{answer.question.title}</div>
                    <video controls>
                      <source
                        src={answer.question.videoAnswer.video.url}
                        type="video/mp4"
                      />
                    </video>
                  </>
                );
              })}
            </div>
          </>
        )}
      </header>
      {jobInformation.data &&
        jobInformation.data.contracts.nodes.map((job) => {
          return (
            <div>
              <h2>Jobs</h2>
              <p>Title: {job.job.title}</p>
              <p>Company: {job.firm.name}</p>
              <p>Hiring Manager: {job.client.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
