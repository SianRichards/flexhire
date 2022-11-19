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

  useEffect(() => {
    const getProfileData = async () => {
      const currentUserInfo = await fetchFlexhireData(currentUserQuery);
      setProfileInformation(currentUserInfo);
    };
    const getJobData = async () => {
      const jobInfo = await fetchFlexhireData(jobQuery);
      setJobInformation(jobInfo);
    };
    getProfileData();
    getJobData();
  }, []);

  return profileInformation.data?.currentUser ? (
    <div className="App">
      <header className="App-header">
        <img
          src={profileInformation.data.currentUser.avatarUrl}
          className="App-logo"
        />
        <p>{profileInformation.data.currentUser.name}</p>
        <div>
          <h2>Skills</h2>
          {profileInformation.data.currentUser.userSkills.map((userSkill) => {
            return (
              <>
                <div>{userSkill.skill.name}</div>
                <div>Level: {userSkill.experience}/5</div>
              </>
            );
          })}
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
      </header>
      {jobInformation.data && (
        jobInformation.data.contracts.nodes.map((job) => {
          return (
            <div>
            <h2>Jobs</h2>
            <p>Title: {job.job.title}</p>
            <p>Company: {job.firm.name}</p>
            <p>Hiring Manager: {job.client.name}</p>
          </div>
          )
        })
      )}
    </div>
  ) : (
    <div>loading</div>
  );
}

export default App;
