import Ember from 'ember';
const{get} = Ember;

export default Ember.Component.extend({
    actions:{
        createTask(){
            this.getAttr('createTask')();
        }
    }
});
