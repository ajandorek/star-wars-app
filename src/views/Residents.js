import * as React from 'react';
import { useParams } from 'react-router-dom';

import { getPlanet, getPlanetResidents } from '../utils/requests';
import parseId from '../utils/parseId';

import { List, ListItem, Title } from '../components';

function Residents({ planet, setSelectedItem }) {
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [residents, setResidents] = React.useState([]);

  React.useEffect(() => {
    // Get planet info to render title and breadcrumb if not found
    if (!planet) {
      getPlanet(params.id).then((planet) => setSelectedItem('planet', planet));
    }

    getPlanetResidents(params.id, planet)
      .then((residents) => {
        setResidents(residents);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  }, [setLoading, params.id, planet, setSelectedItem]);

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
