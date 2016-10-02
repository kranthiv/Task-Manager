import Ember from 'ember';

const{
    get,set
} = Ember;
export default Ember.Route.extend({
    dataService:Ember.inject.service(),
    model(){
        return get(this,'dataService').getTasks();
    }
});
