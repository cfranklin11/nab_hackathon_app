// import Main from './Main';

class SecretAppOnboardingStep3b extends React.Component {

  nextStep(){
    this.props.changeStep(4);
  }

  render () {

    return (
      <div className="container">

        <p> step 3b: I want to spend less moneys </p>

        <button type="submit" className="btn btn-primary"  onClick={ this.nextStep.bind(this) }>Show me what ypu got!</button>


      </div>
    );
  }
}


// export default SecretAppOnboarding;
