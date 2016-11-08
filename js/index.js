let Router = window.ReactRouter;
let RouteHandler = Router.RouteHandler;
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;


import About from 'about.js';
import Main from 'main.js';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('beer'));