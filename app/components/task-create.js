import Ember from 'ember';
import task from '../models/task';
import duration from '../models/duration';
const{get,set,computed:{sum}} = Ember;
export default Ember.Component.extend({
    currTask :null,
    currDuration:null,
    init(){
        this._super(...arguments);
        set(this,'currTask',task.create());
        set(this,'currDuration',duration.create());
    },
    actions:{
        createTask(){
            Ember.Logger.info("hours",get(this,'currTask.hours'));
            Ember.Logger.info("minutes",get(this,'currTask.minutes'));
            //this.get('onCreate')(get(this,'currTask'));
        }
    }

});
