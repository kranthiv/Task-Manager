import Ember from 'ember';
import timeUtils from '../../utils/time-util';

const{set,get,computed:{alias}} =Ember;
export default Ember.Controller.extend({
    dataService:Ember.inject.service(),
    newHistory:alias('model'),
    init(){
        this._super(...arguments);
    },
    actions:{
        addEffort(){
            set(this,'newHistory.createdDate',timeUtils.getTodayDate());
            get(this,'dataService').createHistory(get(this,'newHistory'));
        }
    }
});
