class Login extends React.Component {
  constructor (props) {
    super(props);
  }

nextStep(oEvent){
  // TODO: Implement actual login
  window.location = '/users/1';

  // if (oEvent.target.dataset.signup === "true") {
  //   this.props.changeStep(6);
  // } else {
  //   this.props.changeStep(2);
  // }

}



  render () {
    return (
      <div className="row">
               <div className="jumbotron">
                <h1>Welcome</h1>
                <p>Enter your details</p>
                <div className="form-group">
                 <label htmlFor="exampleInputEmail1">Username</label>
                 <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
               </div>

               <div className="form-group">
                 <label htmlFor="exampleInputPassword1">Password</label>
                 <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
               </div>

               <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>start now</button>

              </div>
              <a type="submit" className="btn btn-primary btn-link" data-signup="true" onClick={ this.nextStep.bind(this) }>Sign up</a>
       </div>
     );
  }
}


Login.propTypes = {
  changeStep: React.PropTypes.func
};
