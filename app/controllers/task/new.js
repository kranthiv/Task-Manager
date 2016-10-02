import Ember from 'ember';
const{set,get}=Ember;
export default Ember.Controller.extend({
    dataService:Ember.inject.service(),
    actions:{
        onCreate(task){
            if(!Ember.isNone(task)){
                let p = get(this,'dataService').createTask(task);
                let that = this;
                p.then((data)=>{
                    let _task = data.task;
                    let _history = get(task,'history')[0];
                    set(_history,'comment',get(_task,'title'));
                    set(_history,'taskId',get(_task,'id'));
                    get(that,'dataService').createHistory(_history).then(()=>{
                        that.transitionToRoute('task');
                    });
                })
            }
        }
    }
});
