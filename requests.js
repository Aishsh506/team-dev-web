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

async function CreateGroup(groupName, accessToken) {
	console.log("CreatingGroup:" + groupName);

	try {
		const response = await fetch(defaultPath + "/groups", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: groupName,
			}),
		});
		return response.status;
	} catch (e) {
		console.error(e);
	}
}

async function CreateBuilding(buildingName, accessToken) {
	console.log("CreatingBuilding:" + buildingName);

	try {
		const response = await fetch(defaultPath + "/buildings", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: buildingName,
			}),
		});
		return response.status;
	} catch (e) {
		console.error(e);
	}
}

async function CreateRoom(buildingId, roomName, accessToken) {
	console.log("CreatingRoom:" + roomName);

	try {
		const response = await fetch(
			defaultPath + "/buildings/" + buildingId + "/rooms",
			{
				method: "POST",
				headers: {
					"Authorization": "Bearer " + accessToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: roomName,
				}),
			}
		);
		return response.status;
	} catch (e) {
		console.error(e);
	}
}

async function CreateSubject(subjectName, accessToken) {
	console.log("CreatingSubject:" + subjectName);

	try {
		const response = await fetch(defaultPath + "/subjects", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: subjectName,
			}),
		});
		return response.status;
	} catch (e) {
		console.error(e);
	}
}

async function CreateTeacher(teacherName, accessToken) {
	console.log("CreatingTeacher:" + teacherName);

	try {
		const response = await fetch(defaultPath + "/teachers", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: teacherName,
			}),
		});
		return response.status;
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
