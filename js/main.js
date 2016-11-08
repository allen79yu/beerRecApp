var { Router, Route, IndexRoute, hashHistory, Link } = ReactRouter;

/* Beer Rec Components */
var BeerRec = React.createClass({
  render:function(){
    return(
      <BeerList url="beers" var="ibu=30"/>
    );
  }
});

var BeerList = React.createClass({
 componentDidMount: function() {
    $.ajax({
      url: 'connecter.php?url='+this.props.url+'&var='+this.props.var,
      dataType: 'json',
      cache: false,
      success: function(data) {       
        this.setState({data:data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

 getInitialState : function() {
    return {
      data:[]
    }
  },
  render : function() {
    return (
      <div className='well clearfix'>

      <BeerBox data={this.state.data}/>
      </div>
    );
  }
});

var BeerBox = React.createClass({
  render: function() {
    var beerNodes = this.props.data.map(function(beer) {
      return (
        <li className='beer'>
          <div>{beer.name}</div>
          <Link to={'/beer/'+beer.id}>click</Link>
        </li>
      );
    });
    return (
      <div className="beerList">
        <ul>
          {beerNodes}
        </ul>
      </div>
    );
  }
});

var BeerPage = React.createClass({
  componentDidMount: function() {
    $.ajax({
      url: 'connecter.php?url=beers&var=ids='+this.props.params.beerid,
      dataType: 'json',
      cache: false,
      success: function(data) {       
        this.setState({data:data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

 getInitialState : function() {
    return {
      data:[]
    }
  },
    render:function() {
        return (
          <div>
          	{this.state.data.map(function(beer) {
          		if(beer.labels){
          			var imgSrc = beer.labels.large;
          			return <div>
            				<h1>{beer.name}</h1>
            				<img src={imgSrc}/>
            				<p>{beer.description}</p>
            		   	   </div>;
          		}
          		else{
          			return <div>
            				<h1>{beer.name}</h1>
            				<p>{beer.description}</p>
            		   	   </div>;
          		}
          	})}
          </div>
        );
    }          
});

/* Routers Components */
var App = React.createClass({
  render:function() {
    return (
      <div>
        <ul>
            <li><Link to="beer">View1 link</Link></li>    
            <li><Link to="view2">View2 link</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
          
var View2 = React.createClass({
    render:function() {
        return (
          <div>View 2 content</div>
        );
    }          
});
    
ReactDOM.render(
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/beer" component={BeerRec}/>
    <Route path="/beer/:beerid" component={BeerPage}/>
    <Route path="/view2" component={View2}/>
  </Route>
</Router>,
document.getElementById('app'));

