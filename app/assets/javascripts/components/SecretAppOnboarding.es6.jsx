class SecretAppOnboarding extends React.Component {
  componentWillMount () {
    this.state = { step: 1 }
  }

  handleClick (step) {
    this.setState({ step: step })
  }

  renderLogin () {
    return (
      <div className="container">
        <h1 className="text-center">Lucky App!</h1>
        <Login changeStep={this.handleClick.bind(this)} />
      </div>
    );
  }

  renderStep2 () {
    return (
      <div>
       <SecretAppOnboardingStep2 changeStep={this.handleClick.bind(this)}/>
      </div>
    );
  }

  renderStep3a () {
    return (
      <div>
       <SecretAppOnboardingStep3a changeStep={this.handleClick.bind(this)}/>
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
      <div className="container">
        {this.state.step === 1 && this.renderLogin()}

        {this.state.step === 2 && this.renderStep2()}

        {this.state.step === '3a' && this.renderStep3a()}

        {this.state.step === '3b' && this.renderStep3b()}

        {this.state.step === 4 && this.renderStep4()}
      </div>
    );
  }
}
