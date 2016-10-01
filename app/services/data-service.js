import Ember from 'ember';
import taskUtil from 'task-manager/utils/task-util';
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
    getTasks(id) {
        let _url = get(this,'url');
        if (!Ember.isNone(id)) {
            _url = `${_url}/${id}`;
        }
        let tasksPromise = function () {
            return Ember.$.ajax(_url).then((data) => {
                return taskUtil(data);;
            });
        };
        return RSVP.hash({
            tasks: tasksPromise()
        });
    }
});
