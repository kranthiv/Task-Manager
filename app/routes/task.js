import Ember from 'ember';

const{
    get,set,Logger,computed:{alias}
} = Ember;
export default Ember.Route.extend({
    dataService:Ember.inject.service(),
    tasks:alias('model'),
    model(){
        return get(this,'dataService').getTasks();
    }
});
