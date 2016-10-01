import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        createTask(){
            this.transitionToRoute('task.new');
        }
    }
});
