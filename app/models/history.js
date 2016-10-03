import Ember from 'ember';
const{get,set,computed,observer,run}=Ember;
import timeUtils from 'task-manager/utils/time-util';
export default Ember.Object.extend({
    id:null,
    taskId:null,
    createdDate:null,
    modifiedDate:null,
    duration:null,
    comment:null,
    init(){
        this._super(...arguments);
        get(this,'effortDidChanged');
    },
    effort:0,
    effortDidChanged:observer('duration.{hours,minutes}',function(){
        run.once(this,()=>{
            let total =get(this,'duration.hours')*60 + get(this,'duration.minutes');
            set(this,'effort',total);
        });
    }),
    humanizeEffort:computed('effort',function () {
      let formatedTime = timeUtils.timeUtil(get(this,'effort'));
      if(Ember.isNone(formatedTime))
      {
        return '';
      }
      let hoursDef= formatedTime.h !== 1?'hours':'hour';
      let minutesDef = formatedTime.m !== 1?'minutes':'minute';
      return `${formatedTime.h} ${hoursDef} ${formatedTime.m} ${minutesDef}`;
    })
});
