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
    <div className="col-xs-12 col-md-8">
      <form>
      <div className="form-group">
        <label htmlFor="ammount">How much money you want to spend today?</label>
        <input type="ammount" className="form-control" id="exampleInputEmail1" placeholder="Ammount" />
      </div>
      <div className="form-group">
      <label htmlFor="currency">Enter your currency</label>
      // <input type="currency" className="form-control" id="exampleInputPassword1" placeholder="Your currency"/>
      <div className="dropdown">
      <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      Dropdown
      <span className="caret"></span>
      </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li role="separator" className="divider"></li>
      <li><a href="#">Separated link</a></li>
      </ul>
      </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>


    );
  }
}

HelloWorld.propTypes = {
  path: React.PropTypes.string,
};
