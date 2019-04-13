import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as detailsActions from '../actions/details';

class Details extends React.Component {
  static propTypes = {
    event: PropTypes.array.isRequired,
    selectEvent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { selectEvent, match } = this.props;

    const id = match.params.id;

    // zamiast zmieniać wewnętrzny stan komponentu
    // wywołujemy kreator akcji, który odpowienio zmieni stan w Redux
    selectEvent(parseInt(id, 10));
  }

  render() {
    // wydarzenie zapisane w store pobieramy z propsów,
    // ponieważ udostępniliśmy je komponentowi Details
    // w funkcji "mapStateToProps"
    const event = this.props.event || {};

    return (
      <div>
        <strong>Nazwa:</strong> {event.name}<br />
        <strong>Miejsce:</strong> {event.place}<br />
        <strong>Data:</strong> {event.date}<br />
        <strong>Godzina:</strong> {event.time}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // w tym komponencie nie potrzebujemy informacji o wydarzeniach (eventsState)
  // wystarczy nam, jeśli do propsów przypiszemy tylko częśćo odpowiedzialną za szczegóły wydarzenia
  ...state.detailsState,
});

const mapDispatchToProps = (dispatch) => ({
  // aby móc skorzystać z nowo utworzonego kreatora akcji "selectEvent"
  // musimy dodać go do propsów komponentu
  selectEvent: (eventId) => dispatch(detailsActions.selectEvent(eventId)),
});

// łączymy komponent Details z Reduxem za pomocą HOC "connect"
export default connect(mapStateToProps, mapDispatchToProps)(Details);
