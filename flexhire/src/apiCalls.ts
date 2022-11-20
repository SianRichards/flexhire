async function fetchFlexhireData(queryType: string, apiKey: string) {
  try {
    const response = await fetch("https://api.flexhire.com/api/v2", {
      method: "POST",
      headers: {
        "FLEXHIRE-API-KEY": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryType,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

export default fetchFlexhireData;
