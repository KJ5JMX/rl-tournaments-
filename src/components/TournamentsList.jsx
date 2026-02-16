import TournamentCard from "./TournamentsCard";

export default function TournamentList({ Tournaments }) {
  if (!Tournaments || Tournaments.length === 0) return null;

  return (
    <ul className="tournamentList">
      {Tournaments.map((t) => (
        <TournamentsCard key={t.id} tournament={t} />
      ))}
    </ul>
  );
}
