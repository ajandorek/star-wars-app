import * as React from 'react';
import { useParams } from 'react-router-dom';

import { getPlanet, getPlanetResidents } from '../utils/requests';
import parseId from '../utils/parseId';

import { List, ListItem, Title } from '../components';

function Residents({ planet, setSelectedItem }) {
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [residents, setResidents] = React.useState([]);

  const residentsRequest = React.useCallback(
    async (planet) => {
      try {
        // Get planet info to render title and breadcrumb if not found
        if (!planet) {
          const planetObj = await getPlanet(params.id);
          setSelectedItem('planet', planetObj);
        }

        // check if we have planet before proceeding
        if (planet) {
          const residents = await getPlanetResidents(planet.residents);
          setResidents(residents);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    [params.id, setSelectedItem]
  );

  React.useEffect(() => {
    residentsRequest(planet);
  }, [residentsRequest, planet]);

  return (
    <>
      {planet && <Title value={planet.name} />}
      <List loading={loading}>
        {residents.map((resident) => (
          <ListItem
            handleClick={() => setSelectedItem('resident', resident)}
            key={resident.name}
            to={`/planets/${params.id}/${parseId(resident.url)}`}
            value={resident.name}
            backgroundId={parseId(resident.url)}
          />
        ))}
      </List>
    </>
  );
}

export default Residents;
