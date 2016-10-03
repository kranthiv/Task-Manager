import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        createTask(){
            this.getAttr('createTask')();
        },
        taskDetails(task){
            this.getAttr('taskDetails')(task);
        }
    }
});
