import { useDispatch } from 'react-redux';
import { setFilter } from './../reducers/filterReducer';

export default function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}
