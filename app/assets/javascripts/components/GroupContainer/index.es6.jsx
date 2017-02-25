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
      this.setState({ restaurants: data });
    });
  }

  handleSelect (e) {
    const option = e.target.options[e.target.selectedIndex].value;

    this.setState({ currency: option });

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

  updateDisplayBudget (data) {
    const newBudget = Math.round(parseFloat(this.state.max_budget) * parseFloat(data), 2);
    this.setState({ conversion_rate: parseFloat(data) });
    this.setState({ display_budget: newBudget });
  }

  handleBudgetChange (e) {
    const budget = e.target.value;
    // const custom_budget = budget * this.state.conversion_rate;
    this.setState({ max_budget: budget });
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

          return (<li key={index}>{restaurant.name}, cost per person: {cost}, rating: {restaurant.rating.rating_number}</li>);
        })}
      </ul>
    );
  }

  render () {
    return (
      <div>
        <label htmlFor="friends">Invite your friends!</label>
        <select id="friends">
          <option value="">Select a Friend</option>
          <option value="Bob">Bob</option>
          <option value="Sally">Sally</option>
        </select>
        <label htmlFor="food">What kind of cuisine do you want?</label>
        <input type="text" id="food" name="restaurant[query]" onChange={this.handleCuisineChange.bind(this)} />
        <label htmlFor="budget">Your suggested budget is {this.state.display_budget}</label>
        <select id="currency" onChange={this.handleSelect.bind(this)}>
          <option value="AUD" key="0">AUD</option>
          {this.props.currencies.map((currency, index) => {
            return (<option value={currency} key={index + 1}>{currency}</option>);
          })}
        </select>
        <label htmlFor="your-budget">How much do you want to spend?</label>
        <input id="your-budget" type="number" name="restaurant[max_budget]" onChange={this.handleBudgetChange.bind(this)} />
        <input type="hidden" name="restaurant[city_id]" value="259" />
        <button type="button" onClick={this.handleClick.bind(this)}>See suggestions</button>

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
