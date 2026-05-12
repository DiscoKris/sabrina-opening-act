type City = {
  name: string;
  sound: string;
  challenge: string;
};

export function CityCard({ city }: { city: City }) {
  return (
    <article className="city-card">
      <p className="city-name">{city.name}</p>
      <p className="city-meta">{city.sound}</p>
      <p className="city-copy">{city.challenge}</p>
    </article>
  );
}
