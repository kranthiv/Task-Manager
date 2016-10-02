import Ember from 'ember';
const{get}=Ember;
export default {
    timeUtil(mins) {
        var secs = mins * 60;
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        var obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    },
    getTodayDate(){
        return moment().format('MM-DD-YYYY');
    },
    getTasksBetweenDates(tasks){
        let currDate = this.getTodayDate();
        let weekBackdate = moment().subtract(7,'days').format('MM-DD-YYYY');
        return tasks.filter((item)=>{
          return moment(get(item,'createdDate'),'MM-DD-YYYY').isBetween(weekBackdate,currDate,null, '[]');
        });
    }

}
