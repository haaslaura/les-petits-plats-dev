/**********************************************************************

This JavaScript code is used to create a new tag after clicking
on an ingredient, appliance or utils

**********************************************************************/

import { TagManager } from "../classes/TagManager.js";

const tagManager = new TagManager();

// Select all lists of options
const dropdownArray = document.querySelectorAll(".option-list");

dropdownArray.forEach(dropdown => {
    
    // Browse each table in each list
    dropdown.querySelectorAll(".list-unstyled li").forEach(item => {
        
        item.addEventListener("click", function(event) {

            event.preventDefault();
            tagManager.createTag(item.textContent);
        });
    });         
});