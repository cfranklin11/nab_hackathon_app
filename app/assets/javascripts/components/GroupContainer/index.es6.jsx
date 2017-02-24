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
      <div>
        <label htmlFor="friends">Invite your friends!</label>
        <select id="friends">
          <option value="">Select a Friend</option>
          <option value="Bob">Bob</option>
          <option value="Sally">Sally</option>
        </select>
        <label htmlFor="food">What kind of cuisine do you want?</label>
        <input type="text" id="food" name="restaurant[query]" onChange={this.handleCuisineChange.bind(this)} />
        <label htmlFor="budget">Your suggested budget is {this.props.budget}. What do you want to spend?</label>
        <input type="number" id="restaurant[max_budget]" onChange={this.handleBudgetChange.bind(this)} />
        <input type="hidden" name="restaurant[city_id]" value="259" />
        <button type="button" onClick={this.handleClick.bind(this)}>See suggestions</button>
      </div>
    );
  }
}

GroupContainer.propTypes = {
  budget: React.PropTypes.number,
  path: React.PropTypes.string,
};
