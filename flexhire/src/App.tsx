import React, { useEffect, useState } from 'react';
import './App.css';
import fetchFlexhireData from './apiCalls';
import { currentUserQuery } from './queryTypes';

interface ICurrentUser {
  data: {
  currentUser?: {
    name: string,
    avatarUrl: string,
    userSkills: [
      {
      experience: string,
      skill: {
        name: string
      }
    }
    ],
    answers: [
      {
      question: {
        title: string,
        videoAnswer: {
          video: {
            url: string
          }
        }
      }
    }
    ]
  }}
}

function App() {

  const [profileInformation, setProfileInformation] = useState<Partial<ICurrentUser>>({})

  useEffect(() => {
    fetchFlexhireData(currentUserQuery).then((currentUserInfo) => {
      setProfileInformation(currentUserInfo)
    })
  }, [])

  // useEffect(() => {
  //   console.log(profileInformation, Object.keys(profileInformation).length)
  // }, [profileInformation])

  return (
    profileInformation.data?.currentUser ? 
    <div className="App">
    <header className="App-header">
      <img src={profileInformation.data.currentUser.avatarUrl} className="App-logo" />
      <p>
        {profileInformation.data.currentUser.name}
      </p>
      <div>
      <h2>Skills</h2>
      {profileInformation.data.currentUser.userSkills.map((userSkill) => {
        return (
          <>
          <div>{userSkill.skill.name}</div>
        <div>Level: {userSkill.experience}/5</div>
        </>
        )
      })}
      </div>
      <div>
      {profileInformation.data.currentUser.answers.map((answer) => {
        return (
          <>
          <div>{answer.question.title}</div>
        <video controls><source src={answer.question.videoAnswer.video.url} type="video/mp4" /></video>
        </>
        )
      })}
      </div>
    </header>
  </div> :
  <div>loading</div>
  )
}

export default App;
