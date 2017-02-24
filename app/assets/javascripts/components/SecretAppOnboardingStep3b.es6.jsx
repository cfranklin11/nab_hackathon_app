// import Main from './Main';

class SecretAppOnboardingStep3b extends React.Component {

  nextStep(){
    this.props.changeStep(4);
  }

  render () {

    return (
      <div className="container">


        <div className="col-xs-12 col-md-8">
        <p> step 3b: I want to spend less moneys </p>
        <SecretApp />
        </div>


        <button type="submit" className="btn btn-primary"  onClick={ this.nextStep.bind(this) }>Show me what ypu got!</button>


      </div>
    );
  }
}


// export default SecretAppOnboarding;
