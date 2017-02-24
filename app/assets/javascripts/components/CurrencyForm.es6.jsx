class CurrencyForm extends React.Component {
  constructor (props) {
      super(props);

    }


  handleClick () {
    $.get({
      url: '/convert',
      method: 'GET',
      credentials: 'same-origin',
    }, (data) => {
      console.log("DATA!",data);
    });
  }

  render () {
    const {
      aCurrency
    } = this.props;
    return (
  <div className="col-xs-12 col-md-8">
    <form>
    <div className="form-group">
      <label htmlFor="ammount">How much money you want to spend today?</label>
      <input type="ammount" className="form-control" id="exampleInputEmail1" placeholder="Ammount" />
    </div>
    <div className="form-group">
    <label htmlFor="currency">Enter your currency</label>
     <input type="currency" className="form-control" id="exampleInputPassword1" placeholder="Your currency"/>
    <select
              className="form-control"
              id="widget-select-group"
              onChange={this.handleFilterChange}>
              <option value="" key="0">AUD</option>
              {
                aCurrency.map((currency, index) => {
                  return (
                    <option value={currency} key={index}>{currency}</option>
                  );
                })
              }
            </select>
    </div>
    <button type="submit" className="btn btn-primary" onClick={ this.handleClick }>Submit</button>
    </form>
  </div>


    );
  }
}

CurrencyForm.propTypes = {
  path: React.PropTypes.string,
};
