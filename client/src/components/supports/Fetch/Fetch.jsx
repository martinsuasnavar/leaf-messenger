export const callApi = async (fetchURL, method, body) =>{
  switch (method){
      case 'GET':
              try {
                  const response = await fetch(fetchURL);
                  const data = await response.json();
                  return data;
              } catch (error) {
                      console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
                  return null;
              }
          break;
      case 'POST':
      case 'PUT':
              try {
                  const response = await fetch(fetchURL, {
                      method: method, 
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({body})
                  });
                  return response;
          
              } catch (error) {
                  console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
                  return null;
              }
          break;
      case 'DELETE':
              const response = await fetch(fetchURL, {
                  method: 'DELETE'
              });
              return response;
          break;
      default:
          console.error(`Invalid HTTP method. FetchURL was ${fetchURL}.`);
          break;
  }
}
