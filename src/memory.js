import { projectButtons } from "./addProject";
import buildPage from "./build";
import { itemButtons } from "./itemButtons";
import getProjData from "./projectForm";



export const projectData = (()=>{
let projects = [];
let warning = document.getElementById('projWarning');

const retrieve = () => {
    if (localStorage.getItem("projects") == null){
        localStorage.setItem("projects", '[]')
    }
     const localData = JSON.parse(localStorage.getItem("projects"));
     projects = Array.from(localData);
     console.log(projects);
     localStorage.setItem("projects", JSON.stringify(projects));
     buildPage(projects);
    };


const pSave = () => {
    const localData = JSON.parse(localStorage.getItem("projects"));
    projects = Array.from(localData);
    let newProj = getProjData();
    for (let i = 0; i < projects.length; i++){
        if (projects[i].name.toLowerCase() === newProj.name.toLowerCase()){
            warning.innerText = 'This name is already taken! Add to that project or choose another project name.'
            warning.style.color = '#8B0000';
            console.log('This name is already taken! Add to that project or choose another project name.')
            return;
        }
        if(newProj.name === ''){
            warning.innerText = 'You must enter a name.'
            warning.style.color = '#8B0000';
            return;
        }
        else{warning.innerText = ''}
    }
    projects.push(newProj);
    console.log(projects);
    localStorage.setItem("projects", JSON.stringify(projects));
    buildPage(projects);
};

const iSave = () => {
    let targ = itemButtons.itemTarget.get()
    let newObject = itemButtons.getData()
    let iWarning = document.getElementById('itemWarning');
    // console.log(newObject)
    if(
        newObject.name === ''
        || newObject.date === ''
        || newObject.priority === ''
        || newObject.description === ''
        ){
            iWarning.innerText = 'All fields must be filled out!'
            iWarning.style.color = '#8B0000';
            return;
        }else{
            iWarning.innerText = '';
        };

        for (let proj of projects){
            if(targ == proj.name){ 
                console.log('true');
                let iValue = projects.indexOf(proj);
                projects = [...JSON.parse(localStorage.getItem("projects"))];
                projects[iValue].items.push(newObject);
                localStorage.setItem("projects", JSON.stringify(projects))
                buildPage(projects);
            }
        }
};

const pDelete = () => {
    let targ = projectButtons.pTarget.get();
    for (let proj of projects){
        if (targ == proj.name){
            let pIndex = projects.indexOf(proj);
            projects.splice(pIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            buildPage(projects)
        }
    };
}

const iDelete = () => {
    
    let parentName = itemButtons.deleteTarget.getParent();
    let itargName = itemButtons.deleteTarget.getName();
    let itargPriority = itemButtons.deleteTarget.getPriority();
    let itargDate = itemButtons.deleteTarget.getDate(); 
    let itargDesc = itemButtons.deleteTarget.getDesc();

    console.log(itargName, parentName, itargDate, itargDesc, itargPriority)
    for (let proj of projects){
        if (parentName == proj.name){

            let pIndex = projects.indexOf(proj);
            console.log(pIndex)
            for (let item of projects[pIndex].items){
                if (
                    `Name: ${item.name}` == itargName &&
                    `Priority: ${item.priority}` == itargPriority &&
                    `Due date: ${item.date}` == itargDate &&
                    `Description: ${item.description}` == itargDesc
                    ){
                        let iIndex = projects[pIndex].items.indexOf(item);
                        projects[pIndex].items.splice(iIndex, 1);
                        localStorage.setItem("projects", JSON.stringify(projects));
                        buildPage(projects);
                    }}
    }}
}

const setChecked = () => {
    let targParent = itemButtons.checkTarget.getParent()
    let targName = itemButtons.checkTarget.getName()
    console.log(targName, targParent)
    projects.forEach((proj) => {
        if (targParent === proj.name){
            let pIndex = projects.indexOf(proj);
            projects[pIndex].items.forEach((item) => {
                if (targName === item.name){
                    let iIndex = projects[pIndex].items.indexOf(item);
                    projects[pIndex].items[iIndex].checked = !projects[pIndex].items[iIndex].checked;
                    localStorage.setItem("projects", JSON.stringify(projects));
                    console.log('check changed');
                    }
                }
        )}})
    }
return {retrieve, pSave, iSave, pDelete, iDelete, setChecked}
})();
