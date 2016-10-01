import Ember from 'ember';
import task from '../models/task'
import history from '../models/history';
import duration from '../models/duration';
const{set} = Ember;

export default function taskUtil(tasks) {
  if(Ember.isNone(tasks)){
    return Em.A();
  }
  let _tasks = Ember.A();
  tasks.forEach((t)=>{
    let _task = task.create();
    set(_task,'id',t.id);
    set(_task,'title',t.title);
    set(_task,'createdDate',t.createdDate);
    set(_task,'isCompleted',t.isCompleted);
    let _history = Ember.A();
    t.history.forEach((h)=>{
      let _h = history.create();
      set(_h,'id',h.id);
      set(_h,'createdDate',h.createdDate);
      set(_h,'modifiedDate',h.modifiedDate);

      let _duration = duration.create();
      set(_duration,'hours',h.duration.hours);
      set(_duration,'minutes',h.duration.minutes);

      set(_h,'duration',_duration);
      _history.pushObject(_h);
    });
    set(_task,'history',_history);

    _tasks.pushObject(_task);
  });
return _tasks;
}
