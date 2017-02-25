class UserPage extends React.Component {

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
      newPath = JSON.parse(data);
      window.location = data.newPath;
    });
  }

  handleChange (e) {
    const name = e.target.value;
    this.setState({ name: name });
  }

  nextStep(oEvent){
   const step = oEvent.target.dataset.step;
    this.props.changeStep(step);
  }

  render () {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return (
      <div>
      <div className="row">
      <div className="col-xs-offset-1 col-xs-10">
        <h1 className="welcome-greeting">
        Welcome <b className="username">Linda</b>!<br/> you have <b className="budget">$25</b> AUD to hang out tonight, are you <span className="title">ready?</span></h1>
      </div>
      </div>

      <div className="row">
          <div className="col-xs-offset-1 col-xs-10">
          <div>Path: {this.props.path}</div>
          <form action={this.props.path} method='post'>
            <div className="form-group">
            <label htmlFor="group-name">Group name </label>
            <input type="text" name="group[name]" id="group-name" onChange={this.handleChange.bind(this)}/>
            <input type="hidden" name="authenticity_token" value={csrfToken} />
            <input type="submit" />
              </div>
          </form>
        </div>
      </div>

      <div className="row">
          <div className="col-xs-offset-1 col-xs-10">
        <button type="submit" className="btn btn-lg btn-primary center-block" data-step="go-out" onClick={ this.nextStep.bind(this) }>Go out!</button>
      </div>
      </div>

      </div>

    );
  }
}

UserPage.propTypes = {
  path: React.PropTypes.string,
}
