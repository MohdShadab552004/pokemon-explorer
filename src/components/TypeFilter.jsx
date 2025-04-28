export default function TypeFilter({ types, selectedType, setSelectedType }) {
    return (
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-[200px] h-[50px] pl-2 rounded-full border-2 border-yellow-400 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    );
  }
  