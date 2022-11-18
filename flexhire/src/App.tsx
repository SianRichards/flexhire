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
    contract: {
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
    };
  };
}

function App() {
  const [profileInformation, setProfileInformation] = useState<
    Partial<ICurrentUser>
  >({});
  const [jobInformation, setJobInformation] = useState<Partial<IJobs>>({});

  useEffect(() => {
    fetchFlexhireData(currentUserQuery).then((currentUserInfo) => {
      return setProfileInformation(currentUserInfo);
    });
    fetchFlexhireData(
      jobQuery(JSON.stringify(profileInformation.data?.currentUser?.email))
    ).then((jobInfo) => {
      return setJobInformation(jobInfo);
    });
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
        <div>
          <h2>Jobs</h2>
          <p>Title: {jobInformation.data.contract.job.title}</p>
          <p>Company: {jobInformation.data.contract.firm.name}</p>
          <p>Hiring Manager: {jobInformation.data.contract.client.name}</p>
        </div>
      )}
    </div>
  ) : (
    <div>loading</div>
  );
}

export default App;
