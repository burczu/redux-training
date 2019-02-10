import React from 'react';
import PropTypes from 'prop-types';

class Details extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { event: {} };
  }

  componentDidMount() {
    const { events, match } = this.props;

    const id = match.params.id;
    const event = events.find(item => item.id === parseInt(id, 10));

    this.setState({
      event
    });
  }

  render() {
    const { name, place, date, time } = this.state.event;

    return (
      <div>
        <strong>Nazwa:</strong> {name}<br />
        <strong>Miejsce:</strong> {place}<br />
        <strong>Data:</strong> {date}<br />
        <strong>Godzina:</strong> {time}
      </div>
    );
  }
}

export default Details;
