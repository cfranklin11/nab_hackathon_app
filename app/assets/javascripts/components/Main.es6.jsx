class Main extends React.Component {
  handleClick () {
    $.get({
      url: '/data',
      method: 'GET',
      credentials: 'same-origin',
    }, (data) => {
      console.log("DATA!",data);
    });
  }


  render () {
    return (
     <div>
     Welcome! (main)
     </div>
    );
  }
}

Main.propTypes = {
  path: React.PropTypes.string,
};
