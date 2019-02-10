import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventItem = (props) => {
  const { item, onDeleteItem } = props;

  return (
    <li key={item.id}>
      <strong>{item.name}</strong><br />
      Gdzie: {item.place}<br />
      Kiedy: {item.date} - {item.time}
      <button onClick={() => onDeleteItem(item.id)}>Usuń</button>
      <Link to={'/details/' + item.id}>Szczegóły</Link>
    </li>
  );
};

EventItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default EventItem;
