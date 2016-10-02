import Ember from 'ember';
import taskUtils from 'task-manager/utils/task-util';
const {
  set,
  get,
  RSVP
} = Ember;
export default Ember.Service.extend({
  url: null,
  init() {
    this._super(...arguments);
    set(this, 'url', "http://localhost:3000/tasks");
  },
  getTasks() {
    let that = this;
    let tasksPromise = function() {
      return Ember.$.ajax(get(that, 'url')).then((data) => {
        return taskUtils.convertTasksToModel(data);
      });
    };
    return RSVP.hash({
      tasks: tasksPromise()
    });
  },
  getTaskById(id) {
    let that = this;
    let tasksPromise = function() {
      return Ember.$.ajax(`${get(that,'url')}/${id}`).then((data) => {
        return taskUtils.convertTaskToModel(data);
      });
    };
    return RSVP.hash({
      task: tasksPromise()
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
  }
});
