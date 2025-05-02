import React, { useCallback } from 'react';

function MultiTypeFilter({ types, selectedTypes, setSelectedTypes }) {
  const handleCheckboxChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setSelectedTypes((prev) => [...prev, value]);
      } else {
        setSelectedTypes((prev) => prev.filter((type) => type !== value));
      }
    },
    [setSelectedTypes]
  );

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-yellow-300 mb-5">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Filter by Types</h3>
      <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto">
        {types.map((type) => (
          <label
            key={type}
            className="flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-md transition-all"
          >
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleCheckboxChange}
              className="accent-yellow-500"
            />
            <span className="capitalize text-sm text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default React.memo(MultiTypeFilter);
