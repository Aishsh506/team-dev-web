

let teachers=[];
let buildings=[];
let rooms=[];
let groups=[];
subjects=[];


$(function() {
    console.log("Loaded");
})




async function SetRole(login,role){
    console.log('ChangingRole: '+login +' '+ role);

    try{
        const response=await fetch('https://localhost:7056/api/users/'+role,{
            method:"POST",
            headers:{
                //Authorization,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "login":login
            })
        })
    }
    catch(e){
        console.error(e);
    }
}



async function DeleteBuilding(buildingId){
    console.log("DeletingBuilding");
    try{
        const response=await fetch(defaultPath+'/buildings/'+buildingId ,{
            method: "DELETE",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            })
        })
    }
    catch(e)
    {
        console.error(e);
    }
}

async function DeleteGroup(groupId){
    console.log("DeletingGroup");
    try{
        const response=await fetch(defaultPath+'/groups/'+groupId ,{
            method: "DELETE",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            })
        })
    }
    catch(e)
    {
        console.error(e);
    }
}

async function DeleteRoom(roomId){
    console.log("DeletingRoom");

    try{
        const response=await fetch(defaultPath+'/buildings/rooms/'+roomId ,{
            method: "DELETE",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            })
        })
    }
    catch(e)
    {
        console.error(e);
    }

}

async function DeleteSubject(subjectId){
    console.log("DeletingSubject");

    try{
        const response=await fetch(defaultPath+'/subjects/'+subjectId ,{
            method: "DELETE",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            })
        })
    }
    catch(e)
    {
        console.error(e);
    }

}

async function DeleteTeacher(teacherId){
    console.log("DeletingTeacher");
    try{
        const response=await fetch(defaultPath+'/teachers/'+teacherId ,{
            method: "DELETE",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            })
        })
    }
    catch(e)
    {
        console.error(e);
    }
}
