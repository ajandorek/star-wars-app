import * as React from "react";
import { useParams } from "react-router-dom";

import { getResident } from "../utils/requests";

import { Card, LoadingState } from "../components";

function Person({ selectedResident, setSelectedItem }) {
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [resident, setResident] = React.useState([]);

  React.useEffect(() => {
    getResident(params.charId, selectedResident)
      .then((resident) => {
        setResident(resident);
        setLoading(false);
        // When loading route directly, set the resident
        if (!selectedResident) {
          setSelectedItem("resident", resident);
        }
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  }, [setLoading, params, selectedResident, setSelectedItem]);

  return loading ? (
    <LoadingState />
  ) : (
    <Card
      item={resident}
      header={resident.name}
      values={[
        "height",
        "mass",
        "hair_color",
        "skin_color",
        "eye_color",
        "birth_year",
        "gender",
      ]}
    />
  );
}

export default Person;
