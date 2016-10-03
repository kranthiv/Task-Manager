import Ember from 'ember';
const{get} =Ember;
export default Ember.Route.extend({
    dataService: Ember.inject.service(),
    model(){
        return get(this,'dataService').getTasksWithDetails();
    },
    setupController(controller, model) {
        Ember.Logger.info(model);
        controller.set('model', model);
  }
});
