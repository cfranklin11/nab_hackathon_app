class HelloWorld extends React.Component {
  handleClick () {
    $.get({
      url: this.props.path,
      method: 'POST',
      credentials: 'same-origin',
      data: {
        group: {
          name: 'stuff13',
        },
      },
    }, (data) => {
      // console.log(data);
      // debugger;
      // newPath = JSON.parse(data)
      window.location = data.newPath
    });
  }

  render () {
    return (
      <div>
        <div>Path: {this.props.path}</div>
        <button onClick={ this.handleClick.bind(this) }>Click Me</button>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  path: React.PropTypes.string,
};
