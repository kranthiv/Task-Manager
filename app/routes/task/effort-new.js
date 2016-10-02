import Ember from 'ember';
import history from '../../models/history';
import duration from '../../models/duration';
const{set} =Ember;
export default Ember.Route.extend({
    model(params){
        let _history = history.create();
        set(_history,'duration',duration.create());
        set(_history,'taskId',params.task_id);
        return _history;
    },
    setupController(controller, model) {
        Ember.Logger.info("task with id",model);
        controller.set('model', model);
  }
});
