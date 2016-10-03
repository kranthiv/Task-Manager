import Ember from 'ember';
const{get,computed:{alias},computed} =Ember;
export default Ember.Controller.extend({
    countOfPendingTasks:computed('tasks.[]',function(){
        return get(this,'tasks').filterBy('isCompleted',false).length;
    }),
    countOfCompletedTasks:computed('tasks.[]',function(){
        return get(this,'tasks').filterBy('isCompleted',true).length;
    }),
    countOfTasks:alias('tasks.length'),
    tasks:alias('model.tasks')

});
