// import Main from './Main';

class SecretAppOnboardingStep3a extends React.Component {

  nextStep(){
    this.props.changeStep(4);
  }

  render () {

    return (
      <div className="container">

        <p> step 3a: Your Goals </p>



        <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>I want to take a trip</button>

        <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>I want to make a purchase</button>

        <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>I have a special event</button>

      </div>
    );
  }
}


// export default SecretAppOnboarding;
