// import Main from './Main';

class GroupPage extends React.Component {

  nextStep(){
    this.props.changeStep(4);
  }

  render () {

    return (
      <div className="row">

        <p> Group Page</p>
        <p> Invite your friend to your hang out...</p>



        <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>OK</button>



      </div>
    );
  }
}


// export default SecretAppOnboarding;
