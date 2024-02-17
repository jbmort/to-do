import { projectButtons } from "./addProject.js";
import { itemButtons } from "./itemButtons.js";

export default function buildPage(project){
    const body = document.getElementById('content');
    
    while(body.firstChild){body.removeChild(body.firstChild)}
    project.forEach((proj) => {
        let frag = new DocumentFragment;
        let box = document.createElement('div');
        box.setAttribute('class','projectBox')
        frag.append(box);
        
        let line = document.createElement('h2');
        line.setAttribute('class', 'projectTitle')
        line.innerText = proj.name;

        let projDate = document.createElement('p');
        projDate.setAttribute('class', 'projDate');
        projDate.innerText = `Due date: ${proj.date}`;
        
        let itemButton = document.createElement('button');
        itemButton.setAttribute('class', 'itemButton');

        let deleteProj = document.createElement('button');
        deleteProj.setAttribute('class','deleteProj');
        
        let listContent = document.createElement('div');
        listContent.setAttribute('class', 'listContent');
        let list = proj.items;
        
        for (let item of list){
            let listItem = document.createElement('div');
            listItem.setAttribute('class', 'listItem')
            let checkBox = document.createElement('div');
            checkBox.setAttribute('class', 'checkBox');
            let check = document.createElement('input');
            let value = Math.floor(Math.random()*10000);
            check.setAttribute('type','checkbox');
            check.setAttribute('id', value);
            check.setAttribute('name', value);
            let label = document.createElement('label');
            label.setAttribute('for', value);
            label.innerText = `Name: ${item.name}`;
            let svgDiv = document.createElement('div');
            svgDiv.setAttribute('class', 'svgDiv');
            checkBox.append(check, label, svgDiv);

            if (item.checked == true){
                check.setAttribute('checked', 'checked');
            }
            
            let dateLine = document.createElement('p');
            dateLine.setAttribute('class', 'itemDate')
            dateLine.innerText = `Due date: ${item.date}`;
            let priotityLine = document.createElement('p');
            priotityLine.setAttribute('class', 'itemPriority')
            priotityLine.innerText = `Priority: ${item.priority}`;
            let descriptionLine = document.createElement('p');
            descriptionLine.setAttribute('class', 'itemDescription');
            descriptionLine.innerText = `Description: ${item.description}`;
            

            let itemDelete = document.createElement('button');
            itemDelete.setAttribute('class', 'itemDelete');
            
            listItem.append(checkBox, dateLine, priotityLine, descriptionLine, itemDelete)
            listContent.appendChild(listItem);
            
        };    
        box.append(line, projDate, deleteProj, itemButton, listContent);
        frag.append(box);
        body.append(frag);
    })
    
    projectButtons.setPDelete();
    itemButtons.set();
    itemButtons.setDelete();
    itemButtons.setBoxes();
    console.log('build')

}