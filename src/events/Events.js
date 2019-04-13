import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import Filter from './Filter';
import EventAdd from './EventAdd';

import * as eventsActions from '../actions/events';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    eventsLoading: PropTypes.bool.isRequired,
    eventsError: PropTypes.bool.isRequired,
    eventsErrorMessage: PropTypes.string.isRequired,
    filterBy: PropTypes.string.isRequired,
    clearEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    filterEvents: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
    this.getAddForm = this.getAddForm.bind(this);
  }

  componentDidMount() {
    const { getEvents } = this.props;

    // na pobranie danych z API, dobrym miejscem jest metoda "componentDidMount"
    getEvents();
  }

  clearHandler() {
    const { clearEvents } = this.props;
    clearEvents();
  }

  deleteHandler(eventId) {
    const { deleteEvent } = this.props;
    deleteEvent(eventId);
  }

  handleFilter(event) {
    const { value } = event.target;
    const { filterEvents } = this.props;

    filterEvents(value);
  }

  addSubmitHandler(values) {
    const { addEvent } = this.props;
    const { name, place, date, time } = values;

    addEvent(name, place, date, time);
    this.addForm.reset();
  }

  getAddForm(form) {
    this.addForm = form;
  }

  render() {
    const {
      events,
      eventsLoading,
      eventsError,
      eventsErrorMessage,
      filterBy
    } = this.props;

    // w zależności od aktualnego stanu pobierania...
    // jeśli trwa ładowanie danych - pokaż loader
    if (eventsLoading) {
      return <p>Ładowanie danych...</p>;
    }

    // jeśli wystąpił błąd - pokaż komunikat
    if (eventsError) {
      return <p style={{ color: 'red' }}>Błąd: {eventsErrorMessage}</p>;
    }

    // jeśli nie trwa pobieranie, ani nie ma błędów - pokaż listę wydarzeń
    return (
      <>
        <Filter filter={filterBy} onFilterChange={this.handleFilter} />
        <ul>
          {events.map(item => {
            const date = new Date(item.date);

            if (date >= Date.now() && item.name.indexOf(filterBy) !== -1) {
              return <EventItem key={item.id} item={item} onDeleteItem={this.deleteHandler}/>;
            }

            return null;
          })}
        </ul>
        <button onClick={this.clearHandler}>Wyczyść</button>
        <EventAdd
          onFormSubmit={this.addSubmitHandler}
          getForm={this.getAddForm}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.eventsState,
});

const mapDispatchToProps = (dispatch) => ({
  clearEvents: () => dispatch(eventsActions.clearEvents()),
  deleteEvent: (eventId) => dispatch(eventsActions.deleteEvent(eventId)),
  filterEvents: (filterBy) => dispatch(eventsActions.filterEvents(filterBy)),
  addEvent: (name, place, date, time) => dispatch(eventsActions.addEvent(name, place, date, time)),
  // przypisujem wywołanie kreatora akcji,
  // odpowiedzialnego za pobranie danych z API
  // do propsów komponentu Events
  getEvents: () => dispatch(eventsActions.getEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
