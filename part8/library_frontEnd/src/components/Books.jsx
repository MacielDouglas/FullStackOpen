import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Genre = ({ selectedGenre, setSelectedGenre }) => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>Loading Genres...</div>;
  }

  const books = data.allBooks;

  const genres = [
    ...new Set(
      books
        .map((a) => a.genres)
        .flat()
        .sort(),
    ),
  ];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  return (
    <div>
      {genres.map((item) => (
        <button
          key={item}
          style={{
            fontWeight: item === selectedGenre ? 'bold' : 'normal',
          }}
          onClick={() => handleGenreClick(item)}
        >
          {item}
        </button>
      ))}
      <button key="allGenres" onClick={() => setSelectedGenre(null)}>
        all genres
      </button>
    </div>
  );
};

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (loading) {
    return <div>Loading Books....</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      {selectedGenre !== null ? (
        <p>
          in genre <span style={{ fontWeight: 'bold' }}>{selectedGenre}</span>
        </p>
      ) : (
        ''
      )}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Genre
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default Books;
