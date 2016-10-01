import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        createTask(task){
            Ember.Logger.info(task);
        }
    }
});
