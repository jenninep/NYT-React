var React = require('react');

var Saved = React.createClass({
  getInitialState: function() {
    return {
      saved: []
    }
  },
  handleClick: function(event) {
    var id = event.target.dataset.id;
    this.props.removeSaved(id);
    this.forceUpdate();
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({saved:nextProps.savedArticles});
  },
  render: function(){
    var that = this;
    var deleteBtnStyle = {
      marginLeft: '5px'
    };
    return (
      <div className = "container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Saved Articles</h3>
          </div>
          <div className="panel-body">
          {this.state.saved ? this.state.saved.map(function(article, i)
            {
              return (
                <div key = {i} className = "container">
                  <h4 key={i}>{article.title}</h4>
                  <p>{"article date:" + article.date}</p>
                  <a className = "btn btn-default" href = {article.URL}>Read Full Story</a>
                  <btn className = "btn btn-danger" data-id = {article._id} onClick = {that.handleClick} style = {deleteBtnStyle}>Delete story</btn>
                </div>
              )
            }
          ) : (<h3>There are no saved articles yet.</h3>)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Saved;