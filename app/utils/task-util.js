import Ember from 'ember';
import task from '../models/task';
import history from '../models/history';
import duration from '../models/duration';
const {
  set
} = Ember;

export default {
  convertTasksToModel(tasks) {
      if (Ember.isNone(tasks)) {
        return Ember.A();
      }
      let _tasks = Ember.A();
      tasks.forEach((t) => {
        let _task = task.create();
        set(_task, 'id', t.id);
        set(_task, 'title', t.title);
        set(_task, 'createdDate', t.createdDate);
        set(_task, 'isCompleted', t.isCompleted);
        _tasks.pushObject(_task);
      });
      return _tasks;
    },
    convertTaskToModel(t){
      let _task = task.create();
      if(Ember.isNone(t)){
        return _task;
      }
      set(_task, 'id', t.id);
      set(_task, 'title', t.title);
      set(_task, 'createdDate', t.createdDate);
      set(_task, 'isCompleted', t.isCompleted);
      return _task;
    },
    convertHistoryToModel(histories){
      let _history = Ember.A();
      if(Ember.isNone(histories)){
        return _history;
      }
      histories.forEach((h) => {
        let _h = history.create();
        set(_h, 'id', h.id);
        set(_h, 'createdDate', h.createdDate);
        set(_h, 'modifiedDate', h.modifiedDate);
        set(_h,'comment',h.comment);
        set(h,'taskId',h.taskId);
        
        let _duration = duration.create();
        let _hours = Ember.isNone(h.hours)?0:parseInt(h.hours);
        let _mins = Ember.isNone(h.minutes)?0:parseInt(h.minutes);
        set(_duration, 'hours', _hours);
        set(_duration, 'minutes',_mins);

        set(_h, 'duration', _duration);
        _history.pushObject(_h);
      });
      return _history;
    }
};
