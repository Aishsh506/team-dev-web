let activeLessonId;
let weekStart;
let searchMethod;
let searchId1;
let searchId2;

let subjects;
let buildings;
let rooms;
let teachers;

const formDateOptions = { year: "2-digit", month: "2-digit", day:"2-digit"};
const dateFormat = "dd-mm-yyyy";
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

$(document).ready(async function() {
    await GetLists();

    const search_params = new URL(window.location.href).searchParams;
    searchMethod = search_params.get("method");
    searchId1 = search_params.get("id1");
    searchId2 = search_params.get("id2")
    GenerateTable(parseInt(search_params.get("week")));
    FillInTable();

    LessonForms();
    ScheduleElementForms();
    await GenerateSelects();
    $(".form-check-label").disableSelection();
})