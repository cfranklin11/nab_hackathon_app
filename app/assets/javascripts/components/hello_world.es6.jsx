class HelloWorld extends React.Component {
  handleClick () {
    $.get({
      url: '/data',
      method: 'GET',
      credentials: 'same-origin',
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
