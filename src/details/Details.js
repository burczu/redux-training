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
    selectEvent(parseInt(id, 10));
  }

  render() {
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
  ...state.detailsState,
});

const mapDispatchToProps = (dispatch) => ({
  selectEvent: (eventId) => dispatch(detailsActions.selectEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
