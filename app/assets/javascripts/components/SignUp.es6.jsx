class SignUp extends React.Component {

nextStep(){
  console.log("submit sigup!");
}

  render () {
    return (
      <div className="row">
               <div className="jumbotron">
                <p>Enter your details for Sign Up to Lucky app</p>
                <div className="form-group">
                 <label htmlFor="username">Username</label>
                 <input type="text" className="form-control" id="username" placeholder="username" />
               </div>

               <div className="form-group">
                 <label htmlFor="password">Password</label>
                 <input type="password" className="form-control" id="password" placeholder="Password" />
               </div>

               <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="email" className="form-control" id="email" placeholder="Email" />               </div>

               <button type="submit" className="btn btn-primary" onClick={ this.nextStep.bind(this) }>Submit</button>
              </div>
      </div>

    );
  }
}


SignUp.propTypes = {
  changeStep: React.PropTypes.func
};
