import Ember from 'ember';
const{get} = Ember;

export default Ember.Component.extend({
    actions:{
        createTask(task){
            this.getAttr('createTask')(task);
        },
        taskDetails(task){
            this.getAttr('taskDetails')(task);
        }
    }
});
