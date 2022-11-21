import React from "react";
import { ICurrentUser } from "../Types";
import styles from "./profile.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

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
        <div className={styles.skillsContainer}>
          {profileInformation.data?.currentUser?.userSkills.map(
            (userSkill, index) => {
              console.log(userSkill.experience);
              return (
                <div className={styles.skill} key={index}>
                  <div>{userSkill.skill.name}</div>
                  {parseInt(userSkill.experience) === 1 ? (
                    <div>{userSkill.experience} year of experience</div>
                  ) : (
                    <div>{userSkill.experience} years of experience</div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
      <div>
        <h2>Answers</h2>
        {profileInformation.data?.currentUser?.answers.map((answer, index) => {
          return (
            <Accordion className={styles.accordion} key={index}>
              <AccordionSummary>
                <Typography>{answer.question.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <video controls>
                  <source
                    src={answer.question.videoAnswer.video.url}
                    type="video/mp4"
                  />
                </video>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
