import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const {
    getInputValue,
    filterColumn,
    setFilterByNumericValues,
    filterByNumericValues,
    filterButton,
  } = useContext(StarWarsContext);

  const { column, comparison, value } = filterByNumericValues;

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => getInputValue(target.value) }
      />
      <label htmlFor="column-filter">
        Coluna
        <select
          id="column-filter"
          value={ column }
          name="column-filter"
          onChange={ ({ target }) => setFilterByNumericValues({
            ...filterByNumericValues, column: target.value,
          }) }
          data-testid="column-filter"
        >
          {filterColumn.map((col) => (
            <option
              key={ col }
              value={ col }
            >
              { col }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador
        <select
          id="comparison-filter"
          value={ comparison }
          name="comparison-filter"
          onChange={ ({ target }) => setFilterByNumericValues({
            ...filterByNumericValues, comparison: target.value,
          }) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setFilterByNumericValues({
          ...filterByNumericValues, value: target.value,
        }) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterButton }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
