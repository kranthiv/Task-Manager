import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        createTask(){
            this.transitionToRoute('task.new');
        },
        taskDetails(task){
            // Ember.Logger.info("tassk details",task);
            this.transitionToRoute('task.details',task.id);
        }
    }
});
