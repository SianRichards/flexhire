import React from "react";
import { ICurrentUser } from "../App";

interface IProps {
  profileInformation: Partial<ICurrentUser>;
}

const Profile = (props: IProps) => {
  const { profileInformation } = props;
  return (
    <>
      <img
        src={profileInformation.data?.currentUser?.avatarUrl}
        className="App-logo"
      />
      <p>{profileInformation.data?.currentUser?.name}</p>
      <div>
        <h2>Skills</h2>
        {profileInformation.data?.currentUser?.userSkills.map((userSkill) => {
          return (
            <>
              <div>{userSkill.skill.name}</div>
              <div>Level: {userSkill.experience}/5</div>
            </>
          );
        })}
      </div>
      <div>
        {profileInformation.data?.currentUser?.answers.map((answer) => {
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
  );
};

export default Profile;
