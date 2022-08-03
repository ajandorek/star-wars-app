import * as React from 'react';

import parseId from '../utils/parseId';
import { getAllPlanets } from '../utils/requests';

import { List, ListItem, Input, Title } from '../components';

function Planets({ planets, setSelectedItem, setPlanets }) {
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    getAllPlanets().then((planets) => {
      setPlanets(planets);
      setLoading(false);
    });
  }, [setLoading, setPlanets]);

  const filteredPlanets = () =>
    planets.filter((planet) =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Title value='Star Wars Planets' />
      <Input
        handleChange={(e) => setSearchTerm(e.target.value)}
        label='Search Planets'
      />
      <List loading={loading}>
        {filteredPlanets().map((planet) => (
          <ListItem
            handleClick={() => setSelectedItem('planet', planet)}
            key={planet.name}
            to={`/planets/${parseId(planet.url)}`}
            value={planet.name}
            backgroundId={parseId(planet.url)}
          />
        ))}
      </List>
    </>
  );
}

export default Planets;
