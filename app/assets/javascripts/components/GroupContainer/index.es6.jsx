class GroupContainer extends React.Component {
  componentWillMount () {
    this.state = {
      query: '',
      max_budget: '',
      city_id: 259,
    };
  }

  handleClick () {
    const { query, max_budget, city_id } = this.state
    $.post({
      url: `${this.props.path}/restaurants`,
      credentials: 'same-origin',
      data: {
        restaurant: {
          query: query,
          city_id: 259,
          max_budget: max_budget,
        },
      },
    }, (data) => {
      console.log(data);
    });
  }

  handleBudgetChange (e) {
    const budget = e.target.value;
    this.setState({ max_budget: budget });
  }

  handleCuisineChange (e) {
    const cuisine = e.target.value;
    this.setState({ query: cuisine });
  }

  render () {
    return (
        <div className="col-xs-12 col-md-8">

        <form>
        <div className="form-group">
          <label htmlFor="friends">Invite your friends! </label>
          <select id="friends" className="form-control">
            <option value="">Select a Friend</option>
            <option value="Bob">Bob</option>
            <option value="Sally">Sally</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="food">What kind of cuisine do you want?</label>
          <input className="form-control" type="text" id="food" name="restaurant[query]" onChange={this.handleCuisineChange.bind(this)} />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Select Currency</label>
          <select id="currency" className="form-control">
            <option value="AUD" key="0">AUD</option>
            {this.props.currencies.map((currency, index) => {
              return (<option value={currency} key={index + 1}>{currency}</option>);
            })}
          </select>
        </div>

        <div className="form-group">
          <label className="suggested-budget" htmlFor="budget">Your suggested budget is {this.props.budget}.</label>
          </div>

          <div className="form-group">
          <label htmlFor="budget">What do you want to spend?</label>
          <input className="form-control" type="number" id="restaurant[max_budget]" onChange={this.handleBudgetChange.bind(this)} />
        </div>

        <input type="hidden" name="restaurant[city_id]" value="259" />
        <button type="button" className="btn btn-lg btn-primary" onClick={this.handleClick.bind(this)}>See suggestions</button>
      </form>
      </div>
    );
  }
}

GroupContainer.propTypes = {
  budget: React.PropTypes.number,
  path: React.PropTypes.string,
  currencies: React.PropTypes.array,
};
