import Ember from 'ember';
import timeUtils from '../utils/time-util';
const{get,computed} =Ember;
export default Ember.Object.extend({
    date:null,
    effort:0,
    formatedEffort:computed('effort',function(){
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
