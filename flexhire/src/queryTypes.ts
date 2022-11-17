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
      }
    }
  }`;

export const jobQuery = `{contract(rawId: 16842) {
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
}`;
