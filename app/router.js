import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('task', function() {
    this.route('new');
    this.route('details',{path:"/:id"});
  });
});

export default Router;
