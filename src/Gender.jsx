import React, { useState } from 'react';

const FilterComponent = () => {
  

  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <select 
        className="form-select m-2 p-2 bg-primary text-secondary-emphasis" 
        aria-label="Disabled select example" 
        name="filter" 
        value={filter} 
        onChange={handleChangeFilter}
      >
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {/* Here you can render your filtered content based on the selected filter */}
    </div>
  );
};

export default FilterComponent;

