import * as React from 'react';
import { matchPath } from 'react-router-dom';

import Breadcrumb from '../Breadcrumb';

import parseId from '../../utils/parseId';
import paths from '../../utils/paths';
import { getPlanet } from '../../utils/requests';

import { Chevron, HeaderLoadingDots } from '../../assets/Icons';

import './Header.scss';

function Header({ selectedItems, updateSelectedItems, resetState }) {
  const [loading, setLoading] = React.useState(false);
  const { planet, resident } = selectedItems;

  // check which path we are on to handle disabling breadcrumb
  const getPathObject = (path) => matchPath({ path }, window.location.pathname);

  // Hook to handle getting the full breadcrumb trail if navigating directly to deeply nested URL
  React.useEffect(() => {
    const personPathObject = getPathObject(paths.person);
    if (!resident && personPathObject) {
      setLoading(true);
      getPlanet(personPathObject.params.id).then((planet) => {
        updateSelectedItems('planet', planet);
        setLoading(false);
      });
    }
  }, [resident, updateSelectedItems]);

  return (
    <div className='header'>
      {loading ? (
        <img src={HeaderLoadingDots} alt='header loading animation' className='headerLoader'/>
      ) : (
        <>
          <Breadcrumb
            active={getPathObject(paths.planets)}
            to='/planets'
            handleClick={resetState}
            value='Planets'
          />
          {planet && (
            <>
              <img src={Chevron} alt='chevron' className='headerChevron' />
              <Breadcrumb
                active={getPathObject(paths.residents)}
                to={`/planets/${parseId(planet.url)}`}
                handleClick={() => updateSelectedItems('resident', null)}
                value={planet.name}
              />
            </>
          )}
          {resident && (
            <>
              <img src={Chevron} alt='chevron' className='headerChevron' />
              <div>{resident.name}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
