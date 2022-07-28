import { useEffect, useState } from "react";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom"

function Home() {
  const history = useHistory();
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    listObservations(abortController.signal)
      .then(setObservations)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const tableRows = observations.map((observation) => (
    <tr key={observation.observation_id}>
      <th scope="row">{observation.observation_id}</th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.created_at}</td>
      <td><button onClick={() => history.push(`/observations/${observation.observation_id}/edit`)}>Edit</button></td>
    </tr>
  ));

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Sky Condition</th>
          <th scope="col">Created</th>
          <th scope="col">Edit</th>
        </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Home;