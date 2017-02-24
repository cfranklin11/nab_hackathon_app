class SecretAppOnboardingStep1 extends React.Component {
  constructor (props) {
    super(props);
  }

nextStep(){
  this.props.changeStep(2);
}

logIn() {
  console.log("start now!");
}

  render () {
    return (
      <div className="container">

        <p>SecretAppOnboardingStep1 </p>

        <p>New to melbourne? </p>
        <p> {this.props.step} </p>
        <p>start saving to your future </p>
        <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>start now</button>
        <button type="submit" className="btn btn-default" onClick={ this.logIn }>login</button>
      </div>
    );
  }
}


SecretAppOnboardingStep1.propTypes = {
  changeStep: React.PropTypes.func
};
