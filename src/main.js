import './style.css';

import { projectButtons } from "./addProject.js";
import { projectData } from "./memory.js";


export class Project {
  constructor(name, date){
    this.name = name;
    this.date = date;
    this.items = [];
  }
};

export class Item {
  constructor (name, date, priority, description){
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.description = description;
    this.checked = false;
  }
};

projectData.retrieve();

projectButtons.setProjSubmit();


