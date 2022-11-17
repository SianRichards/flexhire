async function fetchFlexhireData() {
  
  const query = `{
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
  }`

    const response = await fetch('https://api.flexhire.com/api/v2', {
      method: 'POST',
      headers: {
        'FLEXHIRE-API-KEY': 'wbect86l0cegramh',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
      }),
    });
  
    return await response.json();
  }
  
  export default fetchFlexhireData;