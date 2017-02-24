class HelloWorld extends React.Component {
  handleClick () {
    $.get({
      url: '/data',
      method: 'GET',
      credentials: 'same-origin',
    }, (data) => {
      console.log("DATA!",data);
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
    <select className="form-control">
     <option>USD</option>
     <option>CLP</option>
     <option>EUR</option>
     <option>JPY</option>
     <option>INR</option>
   </select>
    </div>
    <button type="submit" className="btn btn-primary" onClick={ this.handleClick }>Submit</button>
    </form>
  </div>


    );
  }
}

HelloWorld.propTypes = {
  path: React.PropTypes.string,
};
