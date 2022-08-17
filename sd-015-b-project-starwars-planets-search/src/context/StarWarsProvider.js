import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchApi from '../services/fetchApi';

// children desestruturado de props
const StarWarsProvider = ({ children }) => {
  const [planets, setplanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterColumn, setFilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  async function getStarWarsData() {
    const results = await fetchApi();
    // console.log(results);
    setplanets(results);
  }

  useEffect(() => {
    getStarWarsData();
  }, []);

  function getInputValue(value) {
    setFilterByName({ name: value });
  }

  function filterButton() {
    const { column, comparison, value } = filterByNumericValues;
    const filteredByNumber = planets.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return comparison;
      }
    });
    setFilteredPlanets(filteredByNumber);
    setFilterColumn(filterColumn.filter((col) => col !== column));
  }

  useEffect(() => {
    function filterOnChenge() {
      const filteredNames = planets
        .filter(({ name }) => name.toLowerCase().includes(filterByName.name));
      setFilteredPlanets(filteredNames);
    }
    filterOnChenge();
  }, [filterByName, planets]);

  return (
    <StarWarsContext.Provider
      value={ { planets,
        getInputValue,
        filteredPlanets,
        filterByName,
        filterColumn,
        filterByNumericValues,
        filterButton,
        setFilterColumn,
        setFilterByName,
        setFilterByNumericValues,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
