let addLessonForm = $("#addLesson");

function LessonForms()
{
    selectInput = addLessonForm.find(".select-input").clone();
    selectInputSelect = selectInput.find("select");
    selectInputLabel = selectInput.find("label")

    selectInputSelect.attr("id", "groupSelectAdd");
    selectInputLabel.attr("for", "groupSelectAdd").html("<b>Группа</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "roomSelectAdd");
    selectInputLabel.attr("for", "roomSelectAdd").html("<b>Аудитория</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "buildingSelectAdd");
    selectInputLabel.attr("for", "buildingSelectAdd").html("<b>Корпус</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "subjectSelectAdd");
    selectInputLabel.attr("for", "subjectSelectAdd").html("<b>Дисциплина</b>");
    selectInput.clone().prependTo(addLessonForm);

    selectInputSelect.attr("id", "timeslotSelectAdd").prop("disabled", false);
    selectInputLabel.attr("for", "timeslotSelectAdd").html("<b>Таймслот</b>");
    timeslots.forEach(function(slot, i) {
        selectInputSelect.append($(`<option value="${i}">${slot}</option>`));
    })
    selectInput.clone().insertAfter(addLessonForm.find(".date-input"));

    modal = $("#newModal").clone().attr("id", "addLessonModal").appendTo("#modals");
    modal.find("h1").text("Добавить пару");
    modal.find(".modal-body").append(addLessonForm);
    modal.find(".btn-primary").click(function() {
        if (Validate($("#endDateInputAdd"), val => {
            startDate = new Date($("#dateInputAdd").val().split("-").reverse().join("-"));
            endDate = new Date(val.split("-").reverse().join("-"));
            return startDate <= endDate;
        }, "Конечная дата пары должна быть больше стартовой"))
        CreateScheduleElement("lesson");
    });
    addLessonForm.removeClass("d-none");

    modal = modal.clone().appendTo("#modals").attr("id", "editLessonModal");
    modal.find("h1").text("Редактировать пару");
    modal.find("#addLesson").attr("id", "editLesson");
    modal.find("#repeatLessonCheckAdd").attr("onclick", "ToggleEndDatePicker('Edit')");

    modal.find("#editLesson").children().each(function() {
        inputLabel = $(this).find("label");
        input = $(this).find("input, select");
        inputLabel.attr("for", inputLabel.attr("for").slice(0, -3) + "Edit");
        input.attr("id", input.attr("id").slice(0, -3) + "Edit");
    })
    modal.find("#editLesson").append(`
        <div class="alert alert-warning d-none" role="alert">
            Недоступно редактирование пар с прошедшей стартовой датой
        </div>`);
    modal.find(".btn-primary").click(function() {
        if (Validate($("#endDateInputEdit"), val => {
            startDate = new Date($("#dateInputEdit").val().split("-").reverse().join("-"));
            endDate = new Date(val.split("-").reverse().join("-"));
            return startDate <= endDate;
        }, "Конечная дата пары должна быть больше стартовой"))
        EditLesson();
    });
    $(`<button type="button" class="btn btn-danger">Удалить пару</button>`)
        .insertBefore(modal.find(".btn-primary"))
        .click(LessonDelete);

    $('.datepicker').datepicker({
        format: dateFormat,
        weekStart: 1,
        startDate: "0d",
        maxViewMode: 0,
        daysOfWeekDisabled: "0",
        daysOfWeekHighlighted: "0",
        todayHighlight: true,
        disableTouchKeyboard: true,
        language: 'ru'
    });
}

function ScheduleElementForms()
{
    form = $('.schedule-element-form');
    label = form.find("label");
    input = form.find("input");

    form.attr("id", "addSubject");
    label.attr("for", "subjectName").html("<b>Название</b>");
    input.attr("id", "subjectName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addSubjectModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить дисциплину");
    emptyModal.find(".modal-body").append(form.clone());
    emptyModal.find(".btn-primary").click(function() {
        if (Validate($("#subjectName"), val => val != "", "Поле не должно быть пустым"))
        CreateScheduleElement("subject");
    });

    form.attr("id", "addBuilding");
    label.attr("for", "buildingName").html("<b>Название</b>");
    input.attr("id", "buildingName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addBuildingModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить корпус");
    emptyModal.find(".modal-body").append(form.clone());
    emptyModal.find(".btn-primary").click(function() {
        if (Validate($("#buildingName"), val => val != "", "Поле не должно быть пустым"))
        CreateScheduleElement("building");
    });

    form.attr("id", "addRoom");
    label.attr("for", "roomName").html("<b>Номер</b>");
    input.attr("id", "roomName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addRoomModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить аудиторию");
    emptyModal.find(".modal-body").append(form.clone());
    $("#addRoom").prepend(`
        <div class="mb-3">
            <label for="roomBuildingSelect" class="form-label"><b>Корпус</b></label>
            <select id="roomBuildingSelect" class="form-select"></select>
        </div>`);
    emptyModal.find(".btn-primary").click(function() {
        if (Validate($("#roomName"), val => val != "", "Поле не должно быть пустым"))
        CreateScheduleElement("room");
    });

    form.attr("id", "addGroup");
    label.attr("for", "groupName").html("<b>Номер</b>");
    input.attr("id", "groupName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addGroupModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить группу");
    emptyModal.find(".modal-body").append(form.clone());
    emptyModal.find(".btn-primary").click(function() {
        if (Validate($("#groupName"), val => val != "", "Поле не должно быть пустым"))
        CreateScheduleElement("group");
    });

    form.attr("id", "addTeacher");
    label.attr("for", "teacherName").html("<b>Ф.И.О</b>");
    input.attr("id", "teacherName");
    emptyModal = $("#newModal").clone();
    emptyModal.attr("id", "addTeacherModal").appendTo($("#modals"));
    emptyModal.find("h1").text("Добавить преподавателя");
    emptyModal.find(".modal-body").append(form);
    emptyModal.find(".btn-primary").click(function() {
        if (Validate($("#teacherName"), val => val != "", "Поле не должно быть пустым"))
        CreateScheduleElement("teacher");
    });
    $(".schedule-element-form").removeClass("d-none");
}

async function GenerateSelects()
{
    FillInSelect($("#subjectSelectAdd, #subjectSelectEdit"), subjects);
    FillInSelect($("#buildingSelectAdd, #buildingSelectEdit, #roomBuildingSelect"), buildings, "title");
    FillInSelect($("#groupSelectAdd, #groupSelectEdit"), groups);
    FillInSelect($("#teacherSelectAdd, #teacherSelectEdit"), teachers);
    FillInSelect($("#roomSelectAdd, #roomSelectEdit"), await GetRooms(buildings[0]?.id));

    $("#buildingSelectAdd").change(async function() {FillInSelect($("#roomSelectAdd"), await GetRooms($("#buildingSelectAdd").val()))});
    $("#buildingSelectEdit").change(async function() {FillInSelect($("#roomSelectEdit"), await GetRooms($("#buildingSelectEdit").val()))});
}

function FillInSelect(select, array, displayedText = "name")
{
    select.empty();
    array.forEach(item => select.append(`<option value="${item.id}">${item[displayedText]}</option>`));
}

async function CreateScheduleElement(type) {
    $(this)?.attr("disabled", true);
    let result;
    switch (type) {
        case "lesson":
            dateInput = $("#dateInputAdd").val().split("-").reverse().join("-");
            if ($("#repeatLessonCheckAdd").prop("checked")) {
                endDateInput = $("#endDateInputAdd").val().split("-").reverse().join("-");
            } else endDateInput = dateInput;
            try {
                result = await PostLesson({
                    startDate: dateInput,
                    endDate: endDateInput,
                    timeslot: $("#timeslotSelectAdd").val(),
                    teacherId: $("#teacherSelectAdd").val(),
                    roomId: $("#roomSelectAdd").val(),
                    groupId: $("#groupSelectAdd").val(),
                    subjectId: $("#subjectSelectAdd").val(),
                    buildingId: $("#buildingSelectAdd").val()
                }, localStorage.getItem("accessToken"));
            } catch(e) {
                console.log(e);
            }
            break;
        case "subject":
            result = await CreateSubject($("#subjectName").val(), localStorage.getItem("accessToken"));
            break;
        case "building":
            result = await CreateBuilding($("#buildingName").val(), localStorage.getItem("accessToken"));
            break;
        case "room":
            result = await CreateRoom($("#roomBuildingSelect").val(), $("#roomName").val(), localStorage.getItem("accessToken"));
            break;
        case "group":
            result = await CreateGroup($("#groupName").val(), localStorage.getItem("accessToken"));
            break;
        case "teacher":
            result = await CreateTeacher($("#teacherName").val(), localStorage.getItem("accessToken"));
        default:
            break;
    }
    if (result == 200) {
        alert("Элемент расписания создан");
        window.location.reload();
    }
    else alert("Ошибка при создании элемента расписания");
    $(this)?.attr("disabled", false);
}

async function EditLesson() {
    $(this)?.attr("disabled", true);
    try {
        dateInput = $("#dateInputEdit").val().split("-").reverse().join("-");
        if ($("#repeatLessonCheckEdit").prop("checked")) {
            endDateInput = $("#endDateInputEdit").val().split("-").reverse().join("-");
        } else {
            endDateInput = dateInput;
        }
        await PutLesson(activeLessonId, {
            startDate: dateInput,
            endDate: endDateInput,
            timeslot: $("#timeslotSelectEdit").val(),
            teacherId: $("#teacherSelectEdit").val(),
            roomId: $("#roomSelectEdit").val(),
            groupId: $("#groupSelectEdit").val(),
            subjectId: $("#subjectSelectEdit").val(),
            buildingId: $("#buildingSelectEdit").val()
        }, localStorage.getItem("accessToken"));
    } catch(e) {
        alert("Ошибка при редактировании расписания");
        console.log(e);
    }
    $(this)?.attr("disabled", false);
    alert("Изменения сохранены");
    window.location.reload();
}

async function LessonDelete() {
    $(this)?.attr("disabled", true);
    try {
        await DeleteLesson(activeLessonId, localStorage.getItem("accessToken"));
    } catch(e) {
        alert("Ошибка при попытке удаления пары");
        console.log(e);
    }
    $(this)?.attr("disabled", false);
    alert("Изменения сохранены");
    window.location.reload();
}