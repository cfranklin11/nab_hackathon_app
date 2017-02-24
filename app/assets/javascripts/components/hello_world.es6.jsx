class HelloWorld extends React.Component {
  componentWillMount () {
    this.state = { name: '' };
  }

  handleClick () {
    $.get({
      url: this.props.path,
      method: 'POST',
      credentials: 'same-origin',
      data: {
        group: {
          name: 'stuff175',
        },
      },
    }, (data) => {
      // console.log(data);
      // debugger;
      newPath = JSON.parse(data);
      window.location = data.newPath;
    });
  }

  handleChange (e) {
    const name = e.target.value;

    this.setState({ name: name });
  }

  render () {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return (
      <div>
        <div>Path: {this.props.path}</div>
        <form action={this.props.path} method='post'>
          <label htmlFor="group-name">Group name</label>
          <input type="text" name="group[name]" id="group-name" onChange={this.handleChange.bind(this)}/>
          <input type="hidden" name="authenticity_token" value={csrfToken} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  path: React.PropTypes.string,
};
