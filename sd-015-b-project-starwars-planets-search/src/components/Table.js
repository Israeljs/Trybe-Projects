import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { filteredPlanets } = useContext(StarWarsContext);

  function headerTable() {
    return (
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tempo de rotação</th>
          <th>Periodo da órbita</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>URL</th>
        </tr>
      </thead>
    );
  }

  function bodyTable() {
    return (
      <tbody>
        {filteredPlanets.length === 0 ? (
          <h1>Carregando...</h1>
        ) : (
          filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))
        )}
      </tbody>
    );
  }

  return (
    <table>
      {headerTable()}
      {bodyTable()}
    </table>
  );
}

export default Table;
