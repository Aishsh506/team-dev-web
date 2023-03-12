const defaultPath = "http://127.0.0.1:5137/api";

async function CreateGroup(groupName) {
	console.log("CreatingGroup:" + groupName);

	try {
		const response = await fetch(defaultPath + "/groups", {
			method: "POST",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: groupName,
			}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function CreateBuilding(buildingName) {
	console.log("CreatingBuilding:" + buildingName);

	try {
		const response = await fetch(defaultPath + "/buildings", {
			method: "POST",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: buildingName,
			}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function CreateRoom(buildingId, roomName) {
	console.log("CreatingRoom:" + roomName);

	try {
		const response = await fetch(
			defaultPath + "/buildings/" + buildingId + "/rooms",
			{
				method: "POST",
				headers: {
					//Authorization:,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: roomName,
				}),
			}
		);
	} catch (e) {
		console.error(e);
	}
}

async function CreateSubject(subjectName) {
	console.log("CreatingSubject:" + subjectName);

	try {
		const response = await fetch(defaultPath + "/subjects", {
			method: "POST",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: subjectName,
			}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function CreateTeacher(teacherName) {
	console.log("CreatingTeacher:" + teacherName);

	try {
		const response = await fetch(defaultPath + "/teachers", {
			method: "POST",
			headers: {
				//Authorization:,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: teacherName,
			}),
		});
	} catch (e) {
		console.error(e);
	}
}

async function GetBuildings() {
	console.log("GettingListOfBuildings");
	try {
		const response = await fetch(defaultPath + "/buildings", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function GetGroups() {
	console.log("GettingListOfGroups");
	try {
		const response = await fetch(defaultPath + "/groups", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function GetRooms(buildingId) {
	console.log("GettingListOfRooms");
	try {
		const response = await fetch(
			defaultPath + "/buildings/" + buildingId + "/rooms",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function GetSubjects() {
	console.log("GettingListOfSubjects");

	try {
		const response = await fetch(defaultPath + "/subjects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function GetTeachers() {
	console.log("GettingListOfTeachers");

	try {
		const response = await fetch(defaultPath + "/teachers/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
	}
}
