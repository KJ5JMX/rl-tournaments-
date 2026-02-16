export default function TournamentCard({ tournament }) {
  const startText = tournament.starts
    ? new Date(tournament.starts).toLocaleString()
    : "Unknown start";

  return (
    <li className="tournamentCard">
      <div className="tournamentRow">
        <span className="tournamentMode">
          {tournament.mode || "unknown mode"}
        </span>
        <span className="tournamentMeta">
          {tournament.players ?? "?"} players{" "}
        </span>
      </div>
      <div className="tournamentStart">{startText}</div>
    </li>
  );
}
