export const currentUserQuery = `{
    currentUser {
      name,
      avatarUrl,
      userSkills {
        experience,
        skill {
           name
        }
      },
      answers {
        question {
          title,
          videoAnswer {
            video {
              url
            }
          }
        }
      },
      email
    }
  }`;

export const jobQuery = 
  `{
    contracts {
      nodes {
        client {
          name
        }
        contractRequests {
          project {
            title
          }
        }
        firm {
          name
        }
        job {
          title
        }
      }
    }
  }`
