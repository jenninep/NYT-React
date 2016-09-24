var React = require('react');
var ReactDOM = require('react-dom');

// var Query = require('./grandChildren/query.js');
// var Results = require('./grandChildren/results.js');
var Helpers = require('../utils/helpers.js');
var Search = React.createClass({
  getInitialState: function(){
    return {
      searchTerm: "",
      startYear: "",
      endYear: "",
      results: "",
      history: [] /*Note how we added in this history state variable*/
    }
  },
  getArticles: function(queryTitle, startYear, endYear) {
    var that = this;
    Helpers.runQuery(queryTitle, startYear, endYear).then(function(articles){
      that.setState({ results: articles});
    })
  },
  saveStory: function(event) {
    console.log(event.target.dataset);
    var title = event.target.dataset.title;
    var url = event.target.dataset.url;
    var date = event.target.dataset.date;
    Helpers.postSaved(title, url, date).then(function(err, res){
      if (err) throw err;
    });
    this.forceUpdate();
  },
  // This function allows childrens to update the parent.
  setTerm: function(term){
    this.setState({
      searchTerm: term
    })
  },
  render: function(){
    var that = this;
    var saveBtnStyle = {
      marginLeft: "5px"
    };
    return (
      <div className = "container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Search Articles</h3>
          </div>
          <div className="panel-body">
            {/* {childrenWithProps} */}
            {/*<Query getArticles = {this.getArticles}/>*/}
          </div>
        </div>
        {/* <Results /> */}
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Your search results</h3>
          </div>
          <div className="panel-body">
            {this.state.results ? this.state.results.map(function(result, i)
              {
                return (
                  <div key = {i} className = "container">
                    <h4 key={i}>{result.headline.main}</h4>
                    <p>{"article date:" + result.pub_date}</p>
                    <a className = "btn btn-default" href = {result.web_url}>Read Full Story</a>
                    <btn className = "btn btn-danger" data-title = {result.headline.main} data-date = {result.pub_date} data-url = {result.web_url} onClick = {that.saveStory} style = {saveBtnStyle}>Save Article</btn>
                  </div>
                )
              }
            ) : (<h3>No search has been entered.</h3>)}
          </div>
        </div>
      </div>
    );
  }

});
module.exports = Search;