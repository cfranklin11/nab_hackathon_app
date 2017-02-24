class HelloWorld extends React.Component {
  handleClick () {
    $.get({
      url: '/restaurants',
      method: 'GET',
      credentials: 'same-origin',
      data: {
        restaurant: {
          city_id: 259,
          query: 'italian',
          max_budget: 100,
        },
      },
    }, (data) => {
      console.log(data);
    });
  }

  render () {
    return (
      <div>
        <div>Path: {this.props.path}</div>
        <button onClick={ this.handleClick }>Click Me</button>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  path: React.PropTypes.string,
};
