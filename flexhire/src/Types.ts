export interface ICurrentUser {
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
  
  export interface IJobs {
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