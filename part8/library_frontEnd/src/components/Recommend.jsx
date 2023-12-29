import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

export default function Recommend() {
  const [login, result] = useMutation(LOGIN, {
    // onError: (error) => {
    //   setError(error.graphQLErrors[0].message);
    // },
  });

  console.log(login);
  console.log(result.data);
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in you favorite genre</p>
    </div>
  );
}
