let activeLessonId;
let weekStart;

let subjects = []
let buildings = []
let rooms = []
let groups = [];
let teachers = [];

const dateFormat = "dd.mm.yy";
const timeslots = [
    "8:45 - 10:20",
    "10:35 - 12:10",
    "12:25 - 14:00",
    "14:45 - 16:20",
    "16:35 - 18:10",
    "18:25 - 20:00",
    "20:15 - 21:50"
]

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//запрет на выделение текста
$.fn.extend({ 
    disableSelection: function() { 
        this.each(function() { 
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function() { return false; };
            } else if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function() { return false; };
            }
        }); 
    } 
});