// import Main from './Main';

class SecretAppOnboardingStep2 extends React.Component {

  nextStep(oEvent){
   const step = oEvent.target.dataset.step;
    this.props.changeStep(step);
  }

  render () {

    return (
      <div className="container">

        <p> step 2: Get started </p>

        <p>Take your first step towars planning your social life </p>

        <button type="submit" className="btn btn-primary" data-step="3a" onClick={ this.nextStep.bind(this) }>I have a goal</button>

        <button type="submit" className="btn btn-primary" data-step="3b" onClick={ this.nextStep.bind(this) }>I want to spend less</button>

      </div>
    );
  }
}


// export default SecretAppOnboarding;
