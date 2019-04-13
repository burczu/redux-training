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
    filterBy: PropTypes.string.isRequired,
    clearEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    filterEvents: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
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
    const { events } = this.props;
    this.setState({
      events,
    });
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
    const { events, filterBy } = this.props;

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
  // uproszczenie - do propsów przekazujemy po prostu cały stan reducera events
  // zwróć uwagę, że do interesującej nas części stanu dostajemy się poprzez
  // właściwość "eventsState" czyli tę, do której przypisaliśmy eventsReducer
  // przy wywołaniu funkcji "combineReducer" (patrz plik /src/reducers/index.js)
  ...state.eventsState,
});

const mapDispatchToProps = (dispatch) => ({
  // z punktu widzenia mapowania kreatorów akcji, nic się nie zmienia
  clearEvents: () => dispatch(eventsActions.clearEvents()),
  deleteEvent: (eventId) => dispatch(eventsActions.deleteEvent(eventId)),
  filterEvents: (filterBy) => dispatch(eventsActions.filterEvents(filterBy)),
  addEvent: (name, place, date, time) => dispatch(eventsActions.addEvent(name, place, date, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
