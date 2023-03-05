let activeLessonId;
let weekStart;

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
const subjectMap = new Map();
subjectMap.set("1", "Math");
const buildingMap = new Map();
const roomMap = new Map();
const groupMap = new Map();
const teacherMap = new Map();

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
