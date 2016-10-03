import Ember from 'ember';
import effortPerDay from '../models/effort-per-day';
const{get,computed:{alias},computed,set} =Ember;
export default Ember.Controller.extend({
    countOfPendingTasks:computed('tasks.[]',function(){
        return get(this,'tasks').filterBy('isCompleted',false).length;
    }),
    countOfCompletedTasks:computed('tasks.[]',function(){
        return get(this,'tasks').filterBy('isCompleted',true).length;
    }),
    countOfTasks:alias('tasks.length'),
    sizeOfStatics:computed('effortsPerWeek',function(){
        let style;
        if(Ember.isNone(get(this,'effortsPerWeek'))){
            style= '';
        }
        else if(get(this,"effortsPerWeek").length>0 && get(this,"effortsPerWeek").length < 4){
        style= "small";
        }else{
            style= "tiny";
        }

    }),
    effortsPerWeek:computed('tasks.@each',function(){
        let that =this;
        let createdDates = get(this,'tasks').mapBy('createdDate').uniq();
        let efforts = Ember.A();
        if(!Ember.isEmpty(createdDates))
        {
        createdDates.forEach((cDate)=>{
            let tasksBasedOnCreatedDate = get(that,'tasks').filterBy('createdDate',cDate);
            let total =0;
            tasksBasedOnCreatedDate.forEach((t)=>{
                total = total+ get(t,'totalEffort');
            });
            let effort = effortPerDay.create();
            set(effort,'date',cDate);
            set(effort,'effort',total);
            efforts.pushObject(effort);
        });

        }
        return efforts;
    }),
    tasks:alias('model')

});
