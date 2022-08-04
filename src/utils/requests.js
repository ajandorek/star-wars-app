const API_URL = 'https://swapi.dev/api';
// initialize empty array to store planets
let planets = [];

// reusable get function
export async function getRequest(url) {
  try {
    const request = await fetch(url);
    // Fetch API will resolve 400 response codes
    // this way we can manually reject any bad responses
    if (request.ok) {
      const response = await request.json();
      return response;
    } else {
      throw new Error ({ message: 'Error' });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

// get full list of planets from pagination
export async function getAllPlanets(url = `${API_URL}/planets`) {
  try {
    const planetsJson = await getRequest(url);

    // adding the next page of planets to our planets array
    planets = [...planets, ...planetsJson.results];

    // rerun the request if the response returns 'next' route
    if (planetsJson.next) {
      return await getAllPlanets(planetsJson.next);
    } else {
      // Remove duplicates when re-fetching for new data
      return planets.filter((planet, index, currentArray) => {
        return (
          index === currentArray.findIndex((item) => item.name === planet.name)
        );
      });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getPlanetResidents(residentsUrls) {
  try {
    const residents = await Promise.allSettled(
      residentsUrls.map(async (url) => await getRequest(url))
    );

    // filter out rejected residents
    return residents
      .filter((resident) => resident.status === 'fulfilled')
      .map((resident) => resident.value);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getResident(id, resident) {
  try {
    // use existing resident if exists
    return resident || (await getRequest(`${API_URL}/people/${id}`));
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getPlanet(id) {
  try {
    return await getRequest(`${API_URL}/planets/${id}`);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
