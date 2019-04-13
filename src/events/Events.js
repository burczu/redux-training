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
    // metoda "clearEvents" to funkcja, którą zdefiniowaliśmy w mapDispatchToProps
    // wywołuje ona akcję czyszczenia stanu, reducer wyłapuje tę akcję i zwraca
    // nowy, zaktualizowany stan, a to z kolei powoduje kolejne renderowanie komponentu
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

    // obiekt "events" znajdujący się w propsach to ten, który zdefiniowaliśmy
    // w obiekcie zwracanym przez mapStateToProps czyli de facto ten znajdujący się store Reduxa
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

// funkcja mapStateToProps jako parametr przyjmuje obikekt stanu (Reduxa)
// natomiast zwraca obiekt, zwykle będący jakimś wycinkiem stanu
// potrzebnym w danym komponencie
// zawartość tego obiektu jest kopiowana do obiektu props komponentu
const mapStateToProps = (state) => ({
  events: state.events,
});

// funkcja mapDispatchToProps jako parametr przyjmuje funkcję dispatch
// podobnie do mapStateToProps zwraca obiekt, którego zawartość jest kopiowana do props
// tym razem jednak, obiekt ten zawiera funkcje, które "dispatchują" akcje Reduxa
const mapDispatchToProps = (dispatch) => ({
  clearEvents: () => dispatch(eventsActions.clearEvents()),
});

// funkcja "connect" to HOC, który wywołuje funkcje mapStateToProps i mamDispatchToProps
// a następnie wzbogaca nasz komponent o wartości zwracane przez te funkcje
export default connect(mapStateToProps, mapDispatchToProps)(Events);
