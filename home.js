var GroupData = new Map();
var TeacherData = new Map();
var BuildingData = new Map();
var RoomData = new Map();
var SubjectData = new Map();

const groupDataListOptions = $("#group-DataListOptions");
const teacherDataListOptions = $("#teacher-DataListOptions");
const buildingDataListOptions = $("#buidlingsdatalistOptions");
const roomDataListOptions = $("#roomsdatalistOptions");
const subjectDataListOptions = $("#subject-listOptions");

const groupListDropDownInput = $("#group-DataList");
const teacherListDropDownInput = $("#teacher-DataList");
const buildingListDropDownInput = $("#buidling-DataList");
const roomListDropDownInput = $("#room-DataList");

const creategroupInput = $("#create-group-Input");
const createsubjectInput = $("#create-subject-Input");
const createbuildingInput = $("#create-building-Input");
const createteacherInput = $("#create-teacher-Input");

const roleSelect = $("#role-Select");
const loginInput = $("#set-role-login-Input");

const bindTeacherInputForm = $("#bind-teacher-form");
const bindTeacherInput = $("#bind-teacher-DataList");

const GroupDropdown = $("#group-Dropdown");
const TeacherDropdown = $("#teacher-Dropdown");
const AuditoriumDropdown = $("#auditorium-Dropdown");

const roomAccorion = $("#edit-room-AccordionBtn");
const createroomInput = $("#create-room-Input");
const deleteroomInput = $("#delete-room-DataList");
const createroombuildingInput = $("#create-room-building-Input");
const deleteroombuildingInput = $("#delete-room-building-DataList");

$(function () {
	console.log("Loaded");

	$("#delete-group-DataList").click(GetGroups);

	$("#delete-teacher-Btn").click(async function () {
		if (TeacherData.has($("#delete-teacher-DataList").val())) {
			console.log(
				"Преподователь существует" +
					TeacherData.get($("#delete-teacher-DataList").val())
			);
			DeleteTeacher(TeacherData.get($("#delete-teacher-DataList").val()));
		} else {
			console.log("Нет такого преподователя");
		}
	});
	//
	$("#group-schedule-Btn").click(GroupShcedule);
	$("#teacher-shcedule-Btn").click(TeacherShcedule);
	$("#auditorioum-schedule-Btn").click(AuditoriumShcedule);

	$("#create-room-Btn").click(async function () {
		BuildingId = BuildingData.get(createroombuildingInput.val());
		createroomInputValue = createroomInput.val();
		await CreateRoom(BuildingId, createroomInputValue);
		await ReloadRoomData();
	});

	$("#set-role-Btn").click(async function () {
		roleSelectValue = roleSelect.val();
		loginValue = loginInput.val();
		bindTeacherInputValue = "";
		if (roleSelectValue == "0" && TeacherData.has(bindTeacherInput.val())) {
			bindTeacherInputValue = TeacherData.get(bindTeacherInput.val());
		}
		await SetRole(loginValue, roleSelectValue, bindTeacherInputValue);
	});

	$("#create-group-Btn").click(async function () {
		await CreateGroup(creategroupInput.val());
		await ReloadGroupData();
		//creategroupInput.val('')
	});

	$("#create-subject-Btn").click(async function () {
		await CreateSubject(createsubjectInput.val());
		await ReloadSubjectData();
		//createsubjectInput.val('');
	});

	$("#create-building-Btn").click(async function () {
		await CreateBuilding(createbuildingInput.val());
		await ReloadBuildingData();
		//
	});

	$("#create-teacher-Btn").click(async function () {
		await CreateTeacher(createteacherInput.val());
		await ReloadTeacherData();
		//
	});

	$("#delete-group-Btn").click(async function () {
		deletegroupInputValue = $("#delete-group-DataList").val();
		if (GroupData.has(deletegroupInputValue)) {
			console.log("Correct Group Input");
			await DeleteGroup(GroupData.get(deletegroupInputValue));
			await ReloadGroupData();
		} else {
			console.log("Incorrect Group Input");
		}
	});

	$("#delete-subject-Btn").click(async function () {
		deletesubjectInputValue = $("#delete-subject-DataList").val();
		if (SubjectData.has(deletesubjectInputValue)) {
			console.log("Correct Subject Input");
			await DeleteSubject(SubjectData.get(deletesubjectInputValue));
			await ReloadSubjectData();
		} else {
			console.log("InCorrect Input");
		}
	});

	$("#delete-building-Btn").click(async function () {
		deletebuildingInputValue = $("#delete-building-DataList").val();

		if (BuildingData.has(deletebuildingInputValue)) {
			console.log("Correct Input");
			await DeleteBuilding(BuildingData.get(deletebuildingInputValue));
			await ReloadBuildingData();
		} else {
			console.log("InCorrect Input");
		}
	});

	$("#delete-room-Btn").click(async function () {
		//remove from roomData
		deleteroomInputValue = deleteroomInput.val();

		if (!RoomData.has(deleteroomInputValue)) {
			console.log("Нет такой аудитории");
		} else if (!BuildingData.has(deleteroombuildingInput.val())) {
			console.log("Нет такого корпуса");
		} else {
			console.log("Everything Correct");
			await DeleteRoom(RoomData.get(deleteroomInputValue));
			await ReloadRoomData(BuildingData.get(deleteroombuildingInput.val()));
		}
	});

	roleSelect.on({
		change: function () {
			console.log($(this).val());
			if ($(this).val() == "0" && bindTeacherInputForm.hasClass("d-none")) {
				bindTeacherInputForm.removeClass("d-none");
			} else if (
				$(this).val() != "0" ||
				!bindTeacherInputForm.hasClass("d-none")
			) {
				bindTeacherInputForm.addClass("d-none");
				bindTeacherInput.val("");
			}
		},
	});

	GroupDropdown.bind("hide.bs.dropdown", (event) => {
		groupListDropDownInput.val("");
	});
	TeacherDropdown.bind("hide.bs.dropdown", (event) => {
		teacherListDropDownInput.val("");
	});
	AuditoriumDropdown.bind("hide.bs.dropdown", (event) => {
		buildingListDropDownInput.val("");
		roomListDropDownInput.val("");
		roomListDropDownInput.prop("disabled", true);
	});

	GroupDropdown.bind("show.bs.dropdown", async (event) => {
		await ReloadGroupData();
	});

	TeacherDropdown.bind("show.bs.dropdown", async (event) => {
		await ReloadTeacherData();
	});

	AuditoriumDropdown.bind("show.bs.dropdown", async (event) => {
		await ReloadBuildingData();
	});

	buildingListDropDownInput.focusout(async function () {
		//Проверка на наличие такого option и получение соответствующего
		buildingListDropDownInputValue = buildingListDropDownInput.val();
		if (BuildingData.has(buildingListDropDownInputValue)) {
			console.log("Такой Корпус Существует");
			buildingId = BuildingData.get(buildingListDropDownInputValue);

			await ReloadRoomData(buildingId);

			if (roomListDropDownInput.prop("disabled")) {
				roomListDropDownInput.prop("disabled", false);
			}
		} else {
			console.log("Такого корпуса не существует");
			if (!roomListDropDownInput.prop("disabled")) {
				roomListDropDownInput.prop("disabled", true);
				roomListDropDownInput.val("");
			}
		}
	});

	createroombuildingInput.focusout(function () {
		createroombuildingInputValue = createroombuildingInput.val();
		if (BuildingData.has(createroombuildingInputValue)) {
			console.log("Такой Корпус Существует");
			buildingId = BuildingData.get(createroombuildingInputValue);
			if (createroomInput.prop("disabled")) {
				createroomInput.prop("disabled", false);
			}
		} else {
			console.log("Такого корпуса не существует");
			if (!createroomInput.prop("disabled")) {
				createroomInput.prop("disabled", true);
				createroomInput.val("");
			}
		}
	});

	deleteroombuildingInput.focusout(async function () {
		deleteroombuildingInputValue = deleteroombuildingInput.val();
		if (BuildingData.has(deleteroombuildingInputValue)) {
			console.log("Такой Корпус Существует");
			buildingId = BuildingData.get(deleteroombuildingInputValue);
			ReloadRoomData(buildingId);
			if (deleteroomInput.prop("disabled")) {
				deleteroomInput.prop("disabled", false);
			}
		} else {
			console.log("Такого корпуса не существует");
			if (!deleteroomInput.prop("disabled")) {
				deleteroomInput.prop("disabled", true);
				deleteroomInput.val("");
			}
		}
	});

	roomAccorion.click(async function () {
		if (!createroomInput.prop("disabled")) {
			createroomInput.prop("disabled", true);
			createroomInput.val("");
		}
		if (!deleteroomInput.prop("disabled")) {
			deleteroomInput.prop("disabled", true);
			deleteroomInput.val("");
		}
		ReloadBuildingData();
	});

	$("#edit-teacher-AccordionBtn").click(async function () {
		await ReloadTeacherData();
	});

	$("#edit-building-AccordionBtn").click(async function () {
		await ReloadBuildingData();
	});

	$("#edit-subject-AccordionBtn").click(async function () {
		await ReloadSubjectData();
	});

	$("#edit-group-AccordionBtn").click(async function () {
		await ReloadGroupData();
	});

	$("#edit-role-AccordionBtn").click(async function () {
		await ReloadTeacherData();
	});
});
//##############################################

async function ReloadGroupData() {
	groupDataListOptions.empty();
	GroupData.clear();
	data = await GetGroups();
	//	console.log(data)
	data.forEach((element) => {
		GroupData.set(element.name, element.id);
		groupDataListOptions.append(`<option value="${element.name}">`);
	});
}

async function ReloadTeacherData() {
	teacherDataListOptions.empty();
	TeacherData.clear();
	data = await GetTeachers();
	//console.log(data)
	data.forEach((element) => {
		TeacherData.set(element.name, element.id);
		teacherDataListOptions.append(`<option value="${element.name}">`);
	});
}

async function ReloadBuildingData() {
	buildingDataListOptions.empty();
	BuildingData.clear();
	data = await GetBuildings();
	//	console.log(data)
	data.forEach((element) => {
		BuildingData.set(element.title, element.id);
		buildingDataListOptions.append(`<option value="${element.title}">`);
	});
}

async function ReloadRoomData(BuildingId) {
	roomDataListOptions.empty();
	RoomData.clear();
	data = await GetRooms(BuildingId);
	console.log(data);
	data.forEach((element) => {
		RoomData.set(element.name, element.id);
		roomDataListOptions.append(`<option value="${element.name}">`);
	});
}

async function ReloadSubjectData() {
	subjectDataListOptions.empty();
	SubjectData.clear();
	data = await GetSubjects();
	console.log(data);
	data.forEach((element) => {
		SubjectData.set(element.name, element.id);
		subjectDataListOptions.append(`<option value="${element.name}">`);
	});
}

function GroupShcedule() {
	if (GroupData.has(groupListDropDownInput.val())) {
		console.log("Такая Группа существует");
		window.location.href =
			"/schedule/?method=byGroup&id1=" +
			GroupData.get(groupListDropDownInput.val());
	} else {
		console.log("Такая Группа НЕсуществует");
		//Валидация
	}
}

function TeacherShcedule() {
	if (TeacherData.has(teacherListDropDownInput.val())) {
		console.log("Такой Преподователь есть");
		window.location.href =
			"/schedule/?method=byTeacher&id1=" +
			TeacherData.get(teacherListDropDownInput.val());
	} else {
		console.log("Такого Преподователя нет");
		//Валидация
	}
}

function AuditoriumShcedule() {
	if (!BuildingData.has(buildingListDropDownInput.val())) {
		//Такого корпуса нет
		console.log("Такого корпуса нет");
	} else if (!RoomData.has(roomListDropDownInput.val())) {
		//Такой Аудитории нет

		console.log("Такой Аудитории нет");
	} else {
		console.log("Everething Correct");
		window.location.href =
			"/schedule/?method=byRoom&id2=" +
			BuildingData.get(buildingListDropDownInput.val()) +
			"&id1=" +
			RoomData.get(roomListDropDownInput.val());
	}
} //TODO

async function SetRole(login, role, teacherId) {
	console.log("ChangingRole: " + login + " " + role);

	try {
		const response = await fetch(
			"https://localhost:7056/api/users/" + login + "/role",
			{
				method: "PUT",
				headers: {
					//Authorization,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					role: role,
					teacherId: teacherId,
				}),
			}
		);
	} catch (e) {
		console.error(e);
	}
}

async function DeleteBuilding(buildingId) {
	console.log("DeletingBuilding");
	try {
		const response = await fetch(defaultPath + "/buildings/" + buildingId, {
			method: "DELETE",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function DeleteGroup(groupId) {
	console.log("DeletingGroup");
	try {
		const response = await fetch(defaultPath + "/groups/" + groupId, {
			method: "DELETE",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function DeleteRoom(roomId) {
	console.log("DeletingRoom");

	try {
		const response = await fetch(defaultPath + "/buildings/rooms/" + roomId, {
			method: "DELETE",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function DeleteSubject(subjectId) {
	console.log("DeletingSubject");

	try {
		const response = await fetch(defaultPath + "/subjects/" + subjectId, {
			method: "DELETE",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function DeleteTeacher(teacherId) {
	console.log("DeletingTeacher");
	try {
		const response = await fetch(defaultPath + "/teachers/" + teacherId, {
			method: "DELETE",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	} catch (e) {
		console.error(e);
	}
}
