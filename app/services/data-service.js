import Ember from 'ember';
import taskUtils from '../utils/task-util';
import timeUtils from '../utils/time-util';
const {
  set,
  get,
  RSVP
} = Ember;
export default Ember.Service.extend({
  url: null,
  historyUrl:null,
  init() {
    this._super(...arguments);
    set(this, 'url', "http://localhost:3000/tasks");
    set(this,'historyUrl',"http://localhost:3000/history")
  },
  getTasks() {
    let that = this;
    let tasksPromise = function() {
      return Ember.$.ajax(get(that, 'url')).then((data) => {
        let tasks= taskUtils.convertTasksToModel(data);
        return timeUtils.getTasksBetweenDates(tasks);
      });
    };
    return RSVP.hash({
      tasks: tasksPromise()
    });
  },
  getTaskById(id) {
    let that = this;
    let taskPromise = function() {
      return Ember.$.ajax(`${get(that,'url')}/${id}`).then((data) => {
        return taskUtils.convertTaskToModel(data);
      });
    };
    let historyPromise = function(){
      return Ember.$.ajax(`${get(that,'url')}/${id}/history`).then((data) => {
        return taskUtils.convertHistoryToModel(data);
      });
    }
    let promiseToResolve = {
      task:taskPromise(),
      history:historyPromise()
    }
    return RSVP.hash(promiseToResolve).then((data)=>{
      data.task.set('history',data.history);
      return data.task;
    });
  },
  toggleTaskStatus(id, status) {
    let that = this;
    let tasksPromise = function() {
      return Ember.$.ajax({
        url: `${get(that,'url')}/${id}`,
        method:"PATCH",
        ContentType:"application/json;charset=utf-8",
        data:{isCompleted:status}
      }).then((data) => {
        return taskUtils.convertTaskToModel(data);
      });
    };
    return RSVP.hash({
      task: tasksPromise()
    });
  },
  createTask(task){
    let newTask ={};
    newTask.createdDate = get(task,'createdDate');
    newTask.title = get(task,'title');
    newTask.isCompleted = get(task,'isCompleted');
    //newTask.id = get(task,'id');
    
    let that =this;
    let tasksPromise = function() {
      return Ember.$.ajax({
        url: get(that,'url'),
        method:"POST",
        ContentType:"application/json;charset=utf-8",
        data:newTask
      }).then((data) => {
        return taskUtils.convertTaskToModel(data);
      });
    };
    return RSVP.hash({
      task: tasksPromise()
    });
  },
  createHistory(_history){
    let that =this;
    let newHistory ={};
    newHistory.comment = get(_history,'comment');
    newHistory.createdDate = get(_history,'createdDate');
    newHistory.taskId = get(_history,'taskId');
    newHistory.hours = get(_history,'duration.hours');
    newHistory.minutes = get(_history,'duration.minutes');
     let historyPromise = function() {
      return Ember.$.ajax({
        url: get(that,'historyUrl'),
        method:"POST",
        ContentType:"application/json;charset=utf-8",
        data:newHistory
      }).then((data) => {
        return data;
      });
    };
    return RSVP.hash({
      task: historyPromise()
    });
  }
});
