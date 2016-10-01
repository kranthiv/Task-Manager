import Ember from 'ember';
const{get,set,computed,observer,run}=Ember;
export default Ember.Object.extend({
    id:null,
    createdDate:null,
    modifiedDate:null,
    duration:null,
    init(){
        this._super(...arguments);
        get(this,'effortDidChanged');
    },
    effort:null,
    effortDidChanged:observer('duration.{hours,minutes}',function(){
        run.once(this,()=>{
            let total =get(this,'duration.hours')*60 + get(this,'duration.minutes'); 
            set(this,'effort',total);
        });
    }),
});
