class Login extends React.Component {
  componentWillMount () {
    this.state = { view: 'login' };
  }

  handleClick () {
    const { view } = this.state;

    if (view === 'login') {
      this.setState({ view: 'signup' });
    } else {
      this.setState({ view: 'login' });
    }
  }

  renderLogin () {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return (
      <div className="row">
        <div className="jumbotron">
          <h1>Welcome</h1>
          <p>Enter your details</p>
          <form action="/login" method="post">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                name="session[email]"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email" />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                name="session[password]"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password" />
            </div>
            <input type="hidden" name="authenticity_token" value={csrfToken} />

            <button type="submit" className="btn btn-primary">start now</button>
          </form>
        </div>
        <a
          type="submit"
          className="btn btn-primary btn-link"
          data-signup="true"
          onClick={this.handleClick.bind(this)}>
          Sign up
        </a>
      </div>
     );
  }

  render () {
    return (
      <div>
        {this.state.view === 'login' && this.renderLogin()}

        {this.state.view === 'signup' && <SignUp changeView={this.handleClick.bind(this)}/>}
      </div>
    );
  }
}


Login.propTypes = {
  changeStep: React.PropTypes.func,
};
