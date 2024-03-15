import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { setFilter } from 'redux/contacts/slice';
import { selectFilter } from 'redux/contacts/selectors';
import { selectIsLoading } from 'redux/contacts/selectors';
import css from './Filter.module.css';

const spinnerStyle = {
  padding: '5px 65px',
  position: 'absolute',
  bottom: '-20px',
  left: '60px',
};
export function Filter() {
  const dispatch = useDispatch();
  const savedFilter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  function filterContacts(evt) {
    const valueFilter = evt.target.value.trim();
    dispatch(setFilter(valueFilter));
  }
  return (
    <div className={css.filterWrap}>
      <div className={css.inputWrap}>
        <p className={css.filterText}>Find contacts by name</p>
        <input
          className={css.filterInput}
          type="text"
          onChange={filterContacts}
          value={savedFilter}
          name="filter"
        />
      </div>
      {isLoading && (
        <ThreeDots
          height="20"
          width="50"
          radius="10"
          color="#9B5CFF"
          wrapperClassName="spinner"
          wrapperStyle={spinnerStyle}
          visible={true}
        />
      )}
    </div>
  );
}
