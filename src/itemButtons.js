import { projectData } from "./memory";
import { Item } from "./main";

// ITEM BUTTONS AND FORMS //

export let itemButtons = (()=>{
let iDialog = document.getElementById('itemDialog');
let icloseButton = document.getElementById('itemClose');
let iaddButton = document.getElementsByClassName('itemButton');
let isubButton = document.getElementById('itemSub');
let iDeleteButtons = document.getElementsByClassName('itemDelete');
let itemWarning = document.getElementById('itemWarning');




    icloseButton.addEventListener('click', () => {
        iDialog.close();
        itemWarning.innerText = '';
    })

    isubButton.addEventListener('click', (event) => {
        event.preventDefault();
        projectData.iSave();
        if(itemWarning.innerText === ''){
        itemButtons.set();
        iDialog.close();};})

let setBoxes = () => {
    let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    Array.from(checkBoxes).forEach((box) =>{
        box.addEventListener('click', (event) => {
            checkTarget.set(event);
            projectData.setChecked();
    })})
    }

let setDelete = () => {
    for (let i = 0; i<iDeleteButtons.length; i++){
            iDeleteButtons[i].addEventListener('click', (event) => {
                itemTarget.set(event);
                deleteTarget.set(event);
                projectData.iDelete();

            })
    }
}
    
let set = () => {
    for (let i=0; i<iaddButton.length; i++){
        iaddButton[i].addEventListener('click', (event) => {iDialog.showModal(); 
          itemTarget.set(event);
        })}
    }

let getData = () => {
        let iName = document.getElementById('itemName').value;
        let iDate = document.getElementById('itemDate').value;
        let iPriority = document.getElementById('priority').value;
        let iDesc = document.getElementById('descBox').value;

     
        let newItem = new Item(iName, iDate, iPriority, iDesc);
        return newItem;
    }


let itemTarget = (()=>{
    let iTarget
    let get = () => {return iTarget};
    let set = (event) => {
    iTarget = event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.innerText.replace('Name: ', '');

    };
    return {get, set}
})()

let deleteTarget = (()=>{
    let dTargetName
    let dTargetPriority
    let dTargetDate
    let dTargetDesc
    let dParentName

    let getName = () => { return dTargetName }
    let getPriority = () => {return  dTargetPriority }
    let getDate = () => { return dTargetDate }
    let getDesc = () => { return dTargetDesc }
    let getParent = () => { return dParentName }
    let set = (event) => {
    dParentName = event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.innerText
    dTargetName = event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.previousElementSibling.innerText;
    dTargetPriority = event.currentTarget.previousElementSibling.previousElementSibling.innerText;
    dTargetDate = event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    dTargetDesc = event.currentTarget.previousElementSibling.innerText;
    };
    return {getName, getPriority, getDate, getDesc, getParent, set}
})();

let checkTarget = (() => {
    let checkParent
    let checkName
    let getParent = () => {
        return checkParent;
    };

    let getName = () => {
        return checkName
    };

    let set = (event) => {
        checkParent = event.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerText;
        checkName = event.currentTarget.nextSibling.innerText.replace('Name: ', '');
    };

    return {set, getParent, getName}
})();


return {set, getData, setDelete, setBoxes, itemTarget, deleteTarget, checkTarget}
})()



