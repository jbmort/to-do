import { Project } from "./main";


export default function getProjData(){
let projName = document.getElementById('name').value; 
let projDate = document.getElementById('txtdate').value;
const newProject = new Project(projName, projDate);
return newProject;
}