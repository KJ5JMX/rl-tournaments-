import { useRef, useState } from "react";
import "./App.css";
import RegionSelector from "./components/RegionSelector";
import { fetchTournamentsByRegion } from "./services/api";

export default function App() {
  const [region, setRegion] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  function handleRegionChange(nextRegion) {
    setRegion(nextRegion);
    setTournaments([]);
    setError(null);
  }

  async function handleLoadTournaments() {
    if (!region) return;

    setLoading(true);
    setError(null);

    try {
      if (cacheRef.current[region]) {
        setTournaments(cacheRef.current[region]);
      } else {
        const data = await fetchTournamentsByRegion(region);
        setTournaments(data.tournaments || []);
        cacheRef.current[region] = data.tournaments || [];
      }
    } catch (error) {
      setError("Failed to load tournaments. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Rocket League Tournaments</h1>
        <p className="subheading">
          Browse upcoming Rocket League tournaments by region.
        </p>
      </header>

      <main className="main">
        <RegionSelector
          region={region}
          onRegionChange={handleRegionChange}
          onLoad={handleLoadTournaments}
        />

        {loading && <p>Loading tournaments…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && tournaments.length === 0 && region && (
          <p>No tournaments found.</p>
        )}

        <ul>
          {tournaments.map((t) => (
            <li key={t.id}>
              {t.mode} • {t.players} players •{" "}
              {t.starts ? new Date(t.starts).toLocaleString() : "TBD"}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
