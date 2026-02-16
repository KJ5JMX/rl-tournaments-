export default function RegionSelector({ region, onRegionChange, onLoad }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label>
        Region:&nbsp;
        <select value={region} onChange={(e) => onRegionChange(e.target.value)}>
          <option value="">Select a region</option>
          <option value="NA">North America</option>
          <option value="EU">Europe</option>
          <option value="ASIA">Asia</option>
          <option value="SAM">South America</option>
          <option value="OCE">Oceania</option>
        </select>
      </label>

      <button
        onClick={onLoad}
        disabled={!region}
        style={{ marginLeft: "12px" }}
      >
        Load Tournaments
      </button>
    </div>
  );
}
