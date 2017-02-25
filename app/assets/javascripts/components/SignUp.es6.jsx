class SignUp extends React.Component {
  render () {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return (
      <div className="row">
         <div className="jumbotron">
           <form action="/users" method="post">
              <p>Enter your details for Sign Up to Lucky app</p>
              <div className="form-group">
               <label htmlFor="username">Username</label>
               <input name="user[username]" type="text" className="form-control" id="username" placeholder="username" />
             </div>

             <div className="form-group">
               <label htmlFor="password">Password</label>
               <input name="user[password]" type="password" className="form-control" id="password" placeholder="Password" />
             </div>

             <div className="form-group">
               <label htmlFor="password-confirmation">Password</label>
               <input type="password" name= "user[password_confirmation" className="form-control" id="password" placeholder="Password" />
             </div>

             <div className="form-group">
               <label htmlFor="email">Email</label>
               <input name="user[email]" type="email" className="form-control" id="email" placeholder="Email" />
             </div>
             <input type="hidden" name="authenticity_token" value={csrfToken} />
             <button type="submit" className="btn btn-primary">Submit</button>
           </form>
        </div>
        <a
          type="submit"
          className="btn btn-primary btn-link"
          data-signup="true"
          onClick={this.props.changeView}>
          Log in
        </a>
      </div>

    );
  }
}


SignUp.propTypes = {
  changeView: React.PropTypes.func,
};
