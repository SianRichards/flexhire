import React from "react";
import { ICurrentUser } from "../Types";

interface IProps {
  profileInformation: Partial<ICurrentUser>;
}

const Candidate = (props: IProps) => {
  const { profileInformation } = props;
  return (
    <>
      <img
        src={profileInformation.data?.currentUser?.avatarUrl}
        className="App-logo"
      />
      <p>{profileInformation.data?.currentUser?.name}</p>
    </>
  );
};

export default Candidate;
