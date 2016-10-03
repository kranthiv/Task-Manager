import Ember from 'ember';

const{
    get
} = Ember;
export default Ember.Route.extend({
    dataService:Ember.inject.service(),
    model(){
        return get(this,'dataService').getTasks();
    }
});
