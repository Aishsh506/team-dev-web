
 const defaultPath="https://localhost:7056/api";


async function CreateGroup( groupName){
      console.log('CreatingGroup:' +groupName);
      
      try{
          const response=await fetch(defaultPath+"/groups",{
              method:"POST",
              headers:{
                  //Authorization:,
                  "Content-Type": "application/json"
              },
              body:JSON.stringify({
                  "name":groupName
              })
          })
      }
      catch(e){
          console.error(e);
      }
  
  
  }





async function CreateBuilding( buildingName){
    console.log('CreatingBuilding:' +buildingName);
    
    try{
        const response=await fetch(defaultPath+"/buildings",{
            method:"POST",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name":buildingName
            })
        })
    }
    catch(e){
        console.error(e);
    }
}

async function CreateBuilding( buildingId,roomName){
    console.log('CreatingRoom:' +roomName);
    
    try{
        const response=await fetch(defaultPath+"/buildings/"+buildingId+'/rooms',{
            method:"POST",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name":roomName
            })
        })
    }
    catch(e){
        console.error(e);
    }
}



async function CreateSubject( subjectName){
    console.log("CreatingSubject:"+subjectName);

    try{
        const response=await fetch(defaultPath+"/subjects",{
            method:"POST",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name":subjectName
            })
        })
    }
    catch(e){
        console.error(e);
    }


}

async function CreateTeacher( teacherName){
    console.log("CreatingTeacher:"+teacherName);

    try{
        const response=await fetch(defaultPath+"/teachers",{
            method:"POST",
            headers:{
                //Authorization:,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name":teacherName
            })
        })
    }
    catch(e){
        console.error(e);
    }


}