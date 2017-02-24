// import Main from './Main';

class UserPage extends React.Component {

  nextStep(oEvent){
   const step = oEvent.target.dataset.step;
    this.props.changeStep(step);
  }

  render () {

    return (
      <div className="row">

      <div className="col-xs-offset-1 col-xs-10">

        <h1 className="welcome-greeting">

        Welcome <b className="username">Linda</b>!<br/> you have <b className="budget">$25</b> AUD to hang out tonight, <span className="title">are you ready?</span></h1>

        <button type="submit" className="btn btn-lg btn-primary" data-step="go-out" onClick={ this.nextStep.bind(this) }>Go out!</button>
        </div>

      </div>
    );
  }
}


// export default SecretAppOnboarding;
