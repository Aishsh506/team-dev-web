const defaultPath = "https://127.0.0.1:7056/api";

async function Login(email, pswd) {
	const response = await fetch(defaultPath + "/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email,
			password: pswd
		})
	});
	if (response.ok) return await response.json();
	const responseBody = await response.json();
	console.log(responseBody);
	throw new Error(response.status);
}

async function Logout(accessToken) {
	const response = await fetch(defaultPath + "/auth/logout", {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + accessToken
		}
	});
	if (!response.ok) {
		const responseBody = await response.json();
		console.log(responseBody);
		throw new Error(responseBody.toString());
	}
}

async function Refresh(refreshToken) {
	const response = await fetch(defaultPath + "/auth/refresh", {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + refreshToken
		}
	});
	if (response.ok) return await response.json();
	const responseBody = await response.json();
	console.log(responseBody);
	throw new Error(response.status);
}

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

async function CreateBuilding(buildingId, roomName) {
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
		const response = await fetch(defaultPath + "/subjects/", {
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
