import React, { useEffect, useState } from 'react';
import './App.css';
import fetchFlexhireData from './apiCalls';
import { currentUserQuery } from './queryTypes';

interface ICurrentUser {
  data: {
  currentUser?: {
    name: string,
    avatarUrl: string,
    userSkills: {
      experience: string,
      skill: {
        name: string
      }
    },
    answers: {
      question: {
        title: string,
        videoAnswer: {
          video: {
            url: string
          }
        }
      }
    }
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
    </header>
  </div> :
  <div>loading</div>
  )
}

export default App;
