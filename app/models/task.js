import Ember from 'ember';
import timeUtil from 'task-manager/utils/time-util';
const{get,computed}=Ember;

export default Ember.Object.extend({
    id:null,
    title:null,
    createdDate:null,
    isCompleted:false,
    history:Ember.A(),
    efforts:computed.mapBy('history','effort'),
    totalEffort:computed.sum('efforts'),
    formatedEffort:computed('totalEffort',function() {
      let formatedTime = timeUtil(get(this,'totalEffort'));
      if(Ember.isNone(formatedTime))
      {
        return '';
      }
      let hoursDef= formatedTime.h !== 1?'hours':'hour';
      let minutesDef = formatedTime.m !== 1?'minutes':'minute';
      return `${formatedTime.h} ${hoursDef} ${formatedTime.m} ${minutesDef}`;

    })
});
