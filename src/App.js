import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Planets from "./views/Planets";
import Residents from "./views/Residents";
import Person from "./views/Person";
import NotFound from "./views/NotFound";

import { Header } from "./components";

import paths from "./utils/paths";

import "./App.scss";

const initialItemsState = {
  planet: null,
  resident: null,
};

function App() {
  const [planets, setPlanets] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState(initialItemsState);

  // helper function to update state object
  const updateSelectedItems = (item, itemObject) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      ...{ [item]: itemObject },
    }));
  };

  return (
    <Router>
      <Header
        selectedItems={selectedItems}
        updateSelectedItems={updateSelectedItems}
        resetState={() => setSelectedItems(initialItemsState)}
      />
      <div className="wrapper">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate replace to="planets" />} />
          <Route
            exact
            path={paths.planets}
            element={
              <Planets
                planets={planets}
                setPlanets={setPlanets}
                setSelectedItem={updateSelectedItems}
              />
            }
          />
          <Route
            path={paths.residents}
            element={
              <Residents
                planet={selectedItems.planet}
                setSelectedItem={updateSelectedItems}
              />
            }
          />
          <Route
            path={paths.person}
            element={
              <Person
                selectedResident={selectedItems.resident}
                setSelectedItem={updateSelectedItems}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
