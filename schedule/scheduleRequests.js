async function GetSchedule(weekStartISO, searchMethod, id) {
    let query;
    switch (searchMethod) {
        case "byGroup":
            query = "groupID";
            break;
        case "byTeacher":
            query = "teacherID";
            break;
        case "byRoom":
            query = "roomID";
            break;
    }
    const response = await fetch(`${defaultPath}/lessons/${weekStartISO}?${query}=${id}`, { method: "GET" });
    if (response.ok) return await response.json();
    const responseBody = await response.json();
	console.log(responseBody);
	throw new Error(response.status);
}

async function PostLesson(lessonDTO, accessToken) {
    const response = await fetch(defaultPath + "/lessons", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(lessonDTO)
    })
    if (response.ok) return await response.json();
    const responseBody = await response.json();
	console.log(responseBody);
	throw new Error(response.status);
}

async function PutLesson(lessonDTO, accessToken) {
    const response = await fetch(defaultPath + "/lessons", {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(lessonDTO)
    })
    if (response.ok) return await response.json();
    const responseBody = await response.json();
	console.log(responseBody);
	throw new Error(response.status);
}