// import Main from './Main';

class UserPage extends React.Component {

  nextStep(oEvent){
   const step = oEvent.target.dataset.step;
    this.props.changeStep(step);
  }

  render () {

    return (
      <div className="row">
 
        <h2>Welcome <b>Linda</b>, you have <b>$25</b> AUD to hangout tonight!</h2>

        <button type="submit" className="btn btn-primary" data-step="go-out" onClick={ this.nextStep.bind(this) }>Go out!</button>

      </div>
    );
  }
}


// export default SecretAppOnboarding;
