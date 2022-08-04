import * as React from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import Breadcrumb from '../Breadcrumb';

import parseId from '../../utils/parseId';
import paths from '../../utils/paths';
import { getPlanet } from '../../utils/requests';

import { Chevron, HeaderLoadingDots } from '../../assets/Icons';

import './Header.scss';

const initialBreadcrumbState = {
  planets: true,
  residents: false,
  person: false,
};

function Header({ selectedItems, updateSelectedItems, resetState }) {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [breadcrumbs, setBreadcrumbs] = React.useState(initialBreadcrumbState);
  const { planet, resident } = selectedItems;

  // check which path we are on to handle disabling breadcrumb
  const getPathObject = (path) => matchPath({ path }, window.location.pathname);

  // Update breadcrumb on navigation
  React.useEffect(() => {
    if (getPathObject(paths.residents)) {
      setBreadcrumbs((prevState) => ({
        ...prevState,
        residents: true,
        person: false,
      }));
    } else if (getPathObject(paths.person)) {
      setBreadcrumbs((prevState) => ({
        ...prevState,
        residents: true,
        person: true,
      }));
    } else {
      setBreadcrumbs(initialBreadcrumbState);
    }
  }, [location]);

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
        <img
          src={HeaderLoadingDots}
          alt='header loading animation'
          className='headerLoader'
        />
      ) : (
        <>
          <Breadcrumb
            active={getPathObject(paths.planets)}
            to='/planets'
            handleClick={resetState}
            value='Planets'
          />
          {breadcrumbs.residents && planet && (
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
          {breadcrumbs.person && resident && (
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
