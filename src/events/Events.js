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
    clearEvents: PropTypes.func.isRequired,
  };

  state = {
    events: [],
    filter: '',
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
    const { events } = this.state;
    const filtered = events.filter((event) => event.id !== eventId);

    this.setState({
      events: filtered,
    });
  }

  handleFilter(event) {
    const { value } = event.target;

    this.setState({
      filter: value,
    });
  }

  addSubmitHandler(values) {
    const { events } = this.state;

    this.setState({
      events: [
        ...events,
        {
          ...values,
          id: events.length + 1,
        },
      ]
    }, () => {
      if (this.addForm) {
        this.addForm.reset();
      }
    });
  }

  getAddForm(form) {
    this.addForm = form;
  }

  render() {
    const {
      filter,
    } = this.state;
    const { events } = this.props;

    return (
      <>
        <Filter filter={filter} onFilterChange={this.handleFilter} />
        <ul>
          {events.map(item => {
            const date = new Date(item.date);

            if (date >= Date.now() && item.name.indexOf(filter) !== -1) {
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
  events: state.events,
});

const mapDispatchToProps = (dispatch) => ({
  clearEvents: () => dispatch(eventsActions.clearEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
