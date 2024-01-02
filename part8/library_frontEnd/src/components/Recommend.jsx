import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries';

export default function Recommend() {
  const userQuery = useQuery(USER);
  const booksQuery = useQuery(ALL_BOOKS);

  if (userQuery.loading || booksQuery.loading) {
    return <p>Carregando...</p>;
  }

  if (userQuery.error || booksQuery.error) {
    console.error(
      'Erro na consulta GraphQL:',
      userQuery.error,
      booksQuery.error,
    );
    return <p>Ocorreu um erro ao carregar os dados.</p>;
  }

  const user = userQuery.data ? userQuery.data.me : null;
  const books = booksQuery.data ? booksQuery.data.allBooks : [];

  const favoriteGenre = user && user.favoriteGenre ? user.favoriteGenre : null;

  // Verifica se books é um array antes de usar o filter
  const filteredBooks =
    Array.isArray(books) && books.length
      ? books.filter((book) => book.genres.includes(favoriteGenre))
      : [];

  return (
    <div>
      <h2>Recomendações</h2>
      <p>Livros nos seus gêneros favoritos {favoriteGenre} </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>autor</th>
            <th>publicado</th>
          </tr>
          {filteredBooks.map((livro) => (
            <tr key={livro.title}>
              <td>{livro.title}</td>
              <td>{livro.author.name}</td>
              <td>{livro.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
