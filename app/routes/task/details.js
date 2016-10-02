import Ember from 'ember';

const{get,observer,computed,set} =Ember;

export default Ember.Route.extend({
    dataService:Ember.inject.service(),
    taskDetails:null,
    init(){
      this._super(...arguments);
      get(this,'taskStatusDidChange');
    },
    model(params){
        console.log(params.id);
        return get(this,'dataService').getTaskById(params.id);
    },
    afterModel(model){
      Ember.Logger.info("details route",model.task);
      set(this,'taskDetails',model.task);
    },
    actions: {
      markTask(){
        get(this,'taskDetails').toggleProperty('isCompleted');
        get(this,'dataService').toggleTaskStatus(get(this,"taskDetails.id"),get(this,"taskDetails.isCompleted"));
      }
    }

});
