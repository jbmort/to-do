import { projectData } from "./memory";
import { itemButtons } from "./itemButtons";

// PROJECT BUTTONS //
export let projectButtons = (()=>{
const dialog = document.getElementById('projectData');
const closeButton = document.getElementById('close');
const addButton = document.getElementById('newProject');
const submitButton = document.getElementById('submit');
let warning = document.getElementById('projWarning');

    addButton.addEventListener('click', () => {dialog.showModal()});

    closeButton.addEventListener('click', () => {
        dialog.close();
        warning.innerText = '';
    });

function setProjSubmit(){    
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        projectData.pSave(); 
        if (warning.innerText === ''){
            dialog.close();
        }
    });
};

let setPDelete = ()=>{
    let deleteP = document.getElementsByClassName('deleteProj')
for (let button of deleteP){
    button.addEventListener('click',(event) =>{
        pTarget.set(event);
        console.log('click');
        projectData.pDelete();
    
    })
}}

let pTarget = (()=>{
    let projTarget
    let get = () => {
        return projTarget
    };
    let set = (event) => {
    projTarget = event.currentTarget.previousElementSibling.previousElementSibling.innerText;
    };
    return {get, set}
})();

return {setPDelete, setProjSubmit, pTarget}
})()