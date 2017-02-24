class NavBar extends React.Component {

  render () {

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
       <div className="container">
         <div className="navbar-header">
           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
             <span className="sr-only">Toggle navigation</span>
             <span className="icon-bar" />
             <span className="icon-bar" />
             <span className="icon-bar" />
           </button>
           <a className="navbar-brand" href="#">Lucky app</a>
         </div>
         <div id="navbar" className="navbar-collapse collapse">
           <ul className="nav navbar-nav">
             <li className="active"><a href="#">Home</a></li>
             <li><a href="#about">About</a></li>
             <li><a href="#contact">Contact</a></li>
           </ul>
         </div>
       </div>
     </nav>

    );
  }
}