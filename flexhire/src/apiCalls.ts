async function fetchFlexhireData(queryType: string) {

    const response = await fetch('https://api.flexhire.com/api/v2', {
      method: 'POST',
      headers: {
        'FLEXHIRE-API-KEY': 'wbect86l0cegramh',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryType,
      }),
    });
  
    return await response.json();
  }
  
  export default fetchFlexhireData;