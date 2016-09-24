var React = require('react');

var Saved = require('./Children/Saved.js');
var Search = require('./Children/Search.js');
var Helpers = require('./utils/helpers.js');

var Main = React.createClass({
  getInitialState: function() {
    return {
      savedArticles: []
    }
  },
  componentWillMount: function () {
    var that = this;
    Helpers.getSaved().then(function(docs){
      console.log("my docs",docs)
      that.setState({
        savedArticles: docs.data
      })
    });
  },
  componentDidUpdate: function () {
    var that = this;
    Helpers.getSaved().then(function(docs){
      console.log("my docs",docs)
      that.setState({
        savedArticles: docs.data
      })
    });
  },
  removeSaved: function(id){
    var that = this;
    Helpers.deleteSaved(id).then(function(results){
      that.setState({
        savedArticles: results.data
      });
    });
  },
  render: function() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       savedArticles: this.state.savedArticles,
       checkSaved: this.checkSaved,
       removeSaved: this.removeSaved
     })
    );
    var jumboStyle = {
      textAlign: 'center',
      marginBottom: '5px'
    };
    var btnStyle = {
      marginLeft: '5px'
    };
    var navStyle = {
      marginTop: '5px',
      marginBottom: '10px'
    }
   
  return (
    <div className = "container">
      <div className="jumbotron" style = {jumboStyle}>
        <h1>New York Times Article Search</h1>
        <p>Search for and pin articles of interest!</p>
      </div>
      <nav className="navbar navbar-inverse" style = {navStyle}>
        <div className = "container">
          <a href = "#/Search"><button type="button" className="btn btn-default navbar-btn">Search</button></a>
          <a href = "#/Saved"><button type="button" className="btn btn-default navbar-btn" style = {btnStyle}>Saved Articles</button></a>
        </div>
      </nav>
      <div className = "row">
        {childrenWithProps}
      </div>
    </div>
  );
  }
});

module.exports = Main;
