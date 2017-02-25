class GroupContainer extends React.Component {
  componentWillMount () {
    this.state = {
      query: '',
      max_budget: this.props.max_budget,
      custom_budget: this.props.max_budget,
      city_id: 259,
      restaurants: [],
      currency: 'AUD',
      display_budget: this.props.max_budget,
      conversion_rate: 1,
    };
  }

  handleClick () {
    const { query, custom_budget, city_id } = this.state;
    $.post({
      url: `${this.props.path}/restaurants`,
      credentials: 'same-origin',
      data: {
        restaurant: {
          query: query,
          city_id: 259,
          max_budget: custom_budget,
        },
      },
    }, (data) => {
      this.setState({ restaurants: data });
    });
  }

  handleSelect (e) {
    const { custom_budget, display_budget, conversion_rate } = this.state;
    const option = e.target.options[e.target.selectedIndex].value;

    this.setState({ currency: option });

    if (option === 'AUD') {
      this.customInput.value = Math.round(this.customInput.value / conversion_rate, 2);
      this.setState({
        custom_budget: (custom_budget / conversion_rate),
        display_budget: Math.round(display_budget / conversion_rate, 2),
        conversion_rate: 1,
      });
    } else {
      $.get({
        url: `/convert`,
        credentials: 'same-origin',
        data: {
          currency: {
            sell_currency: option,
          },
        },
      }, (data) => {
        this.updateDisplayBudget(data);
      });
    }
  }

  updateDisplayBudget (data) {
    const { currency, max_budget } = this.state;
    const newBudget = currency === 'AUD' ?
      max_budget :
      Math.round(parseFloat(this.state.max_budget) * parseFloat(data), 2);
    this.customInput.value = newBudget;
    this.setState({
      conversion_rate: parseFloat(data),
      display_budget: newBudget,
    });
  }

  handleBudgetChange (e) {
    const budget = e.target.value;
    const custom_budget = budget / this.state.conversion_rate;
    this.setState({ custom_budget: custom_budget });
  }

  handleCuisineChange (e) {
    const cuisine = e.target.value;
    this.setState({ query: cuisine });
  }

  renderRestaurants () {
    return (
      <ul>
        {this.state.restaurants.map((restaurant, index) => {
          const cost = Math.round(parseFloat(restaurant.average_cost_for_two) / 2, 2);

          return (<li key={index}>{restaurant.name}, cost per person: {cost} AUD, rating: {restaurant.rating.rating_number}</li>);
        })}
      </ul>
    );
  }

  render () {
    return (
      <div className="col-xs-12 col-md-8">
        <div className="form-group">
          <label htmlFor="friends">Invite your friends! </label>
          <select id="friends" className="form-control">
            <option value="">Select a Friend</option>
            <option value="Bob">Bob</option>
            <option value="Sally">Sally</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="food" name="restaurant[query]" onChange={this.handleCuisineChange.bind(this)}>What kind of cuisine do you want?</label>
          <input className="form-control" type="text" id="food" name="restaurant[query]" onChange={this.handleCuisineChange.bind(this)} />
        </div>


        <div className="form-group">
          <label className="suggested-budget" htmlFor="budget">Your suggested budget is {this.state.display_budget}</label>
          <select id="currency" onChange={this.handleSelect.bind(this)}>
            <option value="AUD" key="0">AUD</option>
            {this.props.currencies.map((currency, index) => {
              return (<option value={currency} key={index + 1}>{currency}</option>);
            })}
          </select>
          </div>

          <div className="form-group">
          <label htmlFor="budget">What do you want to spend? (in {this.state.currency})</label>
          <input ref={(input) => {this.customInput = input;}} className="form-control" type="number" name="restaurant[max_budget]" onChange={this.handleBudgetChange.bind(this)} />
        </div>

        <input type="hidden" name="restaurant[city_id]" value="259" />
        <button type="button" className="btn btn-lg btn-primary" onClick={this.handleClick.bind(this)}>See suggestions</button>

        {this.state.restaurants.length > 0 && this.renderRestaurants()}
      </div>
    );
  }
}

GroupContainer.propTypes = {
  max_budget: React.PropTypes.number,
  path: React.PropTypes.string,
  currencies: React.PropTypes.array,
};
