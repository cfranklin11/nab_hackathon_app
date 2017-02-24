class SecretAppOnboarding extends React.Component {
  componentWillMount () {
    this.state = { step: 1 }
  }

  handleClick (step) {
    console.log(step);
    this.setState({ step: step })
  }

  renderLogin () {
    return (
      <div>

         
        <Login changeStep={this.handleClick.bind(this)} />

        </div>

    );
  }

  renderSignUp () {
    return (
      <div>
       <SignUp signMeUp={this.handleClick.bind(this)}/>
      </div>
    );
  }

  renderUserPage () {
    return (
      <div>
       <UserPage changeStep={this.handleClick.bind(this)}/>
      </div>
    );
  }

  renderGroupPage() {
    return (
      <div>
       <GroupPage changeStep={this.handleClick.bind(this)}/>
      </div>
    );
  }
  renderStep3b () {
    return (
      <div>
       <SecretAppOnboardingStep3b changeStep={this.handleClick.bind(this)}/>
      </div>
    );
  }
  renderStep4 () {
    return (
      <div>
       <SecretAppOnboardingStep4 changeStep={this.handleClick.bind(this)}/>
      </div>
    );
  }

  render () {
    return (
      <div>
      <NavBar />
      <div className="container">

        {this.state.step === 1 && this.renderLogin()}

        {this.state.step === 6 && this.renderSignUp()}

        {this.state.step === 2 && this.renderUserPage()}

        {this.state.step === 'go-out' && this.renderGroupPage()}

        {this.state.step === '3b' && this.renderStep3b()}

        {this.state.step === 4 && this.renderStep4()}
      </div>
      </div>
    );
  }
}
