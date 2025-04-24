// pages/directors.js
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/data/movie_db.json', fetcher);

  if (error) return <div className="container mx-auto p-4 text-center">Failed to load</div>;
  if (!data) return <div className="container mx-auto p-4 text-center">Loading...</div>;

  const directors = data.directors;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Directors</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {directors.map(director => (
          <li key={director.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-black">{director.name}</h2>
            <p className="mb-2 text-black">{director.biography}</p>
            <p className="font-semibold mb-2 text-black underline">Movies Directed:</p>
            <ul>
              {data.movies.filter(movie => movie.directorId === director.id).map(movie => (
                <li key={movie.id} className="text-gray-700">{movie.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
