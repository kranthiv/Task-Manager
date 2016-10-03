import Ember from 'ember';
import timeUtils from '../../utils/time-util';

const{set,get,computed:{alias}} =Ember;
export default Ember.Controller.extend({
    dataService:Ember.inject.service(),
    newHistory:alias('model'),
    actions:{
        addEffort(){
            set(this,'newHistory.createdDate',timeUtils.getTodayDate());
            let response = get(this,'dataService').createHistory(get(this,'newHistory'));
            let that = this;
            response.then(()=>{
                this.transitionToRoute('task.details',get(that,'newHistory.taskId'));
            });
        }
    }
});
