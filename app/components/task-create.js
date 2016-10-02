import Ember from 'ember';
import task from '../models/task';
import duration from '../models/duration';
import history from '../models/history';
import timeUtils from '../utils/time-util';
const{get,set} = Ember;
export default Ember.Component.extend({
    dataService:Ember.inject.service(),
    currTask :null,
    currDuration:null,
    isLoading:false,
    init(){
        this._super(...arguments);
        set(this,'currTask',task.create());
        set(this,'currDuration',duration.create());
    },
    actions:{
        createTask(){
            let curDate = timeUtils.getTodayDate();
            set(this,'currTask.createdDate',curDate);
            let _history = Ember.A();
            let h = history.create();
            set(h,'createdDate',curDate);
            set(h,'duration',get(this,'currDuration'));
            _history.pushObject(h);
            set(this,'currTask.history',_history);
            set(this,'isLoading',true);
            this.getAttr('onCreate')(get(this,'currTask'));
            set(this,'currDuration',duration.create());
            set(this,'currTask',task.create());
            set(this,'isLoading',false);
        }
    }

});
