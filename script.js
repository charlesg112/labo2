function hideSelectBox(){
    console.log("Select set to hidden");
    var select = document.getElementById("col");
    select.classList.add("hidden");
}

function showSelectBox(){
    console.log("Select set to visible");
    var select = document.getElementById("col");
    select.classList.remove("hidden");
}

function changeXButtonStateIfNeeded(userEntry) {
    var button = document.getElementById("xbutton");
    if(userEntry.length > 0){
        button.hidden = false;
    }
    else{
        button.hidden = true;
    }
}

function adjustSelectItems(){
    let selectItems = getAllItemsInSelect();
    let userEntry = getUserEntry();
    filterSelectItems(selectItems, userEntry);
    changeXButtonStateIfNeeded(userEntry);
}

function getAllItemsInSelect(){
    var selectBox = document.getElementById("col");
    return selectBox.options;
}

function getUserEntry() {
    var userEntry = document.getElementById("userentry");
    return userEntry.value;
}

function filterSelectItems(selectItems, filter){
    var matchesFound = 0;
    for(var i = 0; i < selectItems.length; ++i){
        if (selectItems[i].id === "nothingfound"){
            continue;
        }
        if(!selectItems[i].value.toLowerCase().includes(filter.toLowerCase())) {
            selectItems[i].hidden = true;
        }
        else{
            selectItems[i].hidden = false;
            console.log("Matching item found: ", selectItems[i].value)
            matchesFound++;
        }
    }
    setSelectDropDownToCorrectSize(matchesFound);
    setValidSelectedItem(selectItems, filter);
    setNoValueFoundVisibility(matchesFound);
}

function setValidSelectedItem(selectItems, filter) {
    var index = findFirstMatch(selectItems, filter);
    if (index !== -1){
        selectItems[index].selected = "selected";
    }
    else{
        document.getElementById("nothingfound").selected = "selected";
    }
}


function setSelectDropDownToCorrectSize(itemsQte){
    var selectBox = document.getElementById("col");
    if (itemsQte > 0){
        selectBox.size = itemsQte;

    }
    else{
        selectBox.size = 1;
    }
}

function findFirstMatch(selectItems, filter) {
    for (var i = 0; i < selectItems.length; ++i) {
        if (selectItems[i].id === "nothingfound") {
            continue;
        }
        if (selectItems[i].value.toLowerCase().includes(filter.toLowerCase())){
            return i;
        }
    }
    return -1;
}

function setNoValueFoundVisibility(matchesFound) {
    var nothingFoundOption = document.getElementById("nothingfound");
    var selectBox = document.getElementById("col");
    if (matchesFound === 0) {
        nothingFoundOption.hidden = false;
    }
    else{
        nothingFoundOption.hidden = true;
    }
}

function getSelectedItemIndex(){
    var selectItems = getAllItemsInSelect();
    for (var i = 0; i < selectItems.length; ++i){
        if (selectItems[i].selected === true) return i;
    }
    return -1;
}

function autocompleteUserEntry() {
    var userEntry = document.getElementById("userentry");
    var selectItems = getAllItemsInSelect();
    var selectedIndex = getSelectedItemIndex();
    console.log("autocompleting user entry : ", selectedIndex);
    if (selectedIndex !== - 1){
        userEntry.value = selectItems[selectedIndex].value;
    }
}

window.onload=function (){
    /* Ajoute le comportement de click au bouton */
    document.getElementById("xbutton").addEventListener("click", function(){
        resetUserEntryValue();
        resetItemsComboboxView();
    })

    /* Ajoute le comportement de click au select */
    document.getElementById("col").addEventListener("click", function(){
        autocompleteUserEntry();
    })

    document.getElementById("grosseBarre").addEventListener("focusin", function(){
        showSelectBox();
    })
    document.getElementById("grosseBarre").addEventListener("focusout", function(event){
        if(event.relatedTarget === null || event.relatedTarget.id !== "col"){
            hideSelectBox();
        }
    })
}

function resetUserEntryValue(){
    var userEntry = document.getElementById("userentry");
    userEntry.value = "";
}

function resetItemsComboboxView(){
    var selectItems = getAllItemsInSelect();
    var qteOfEntries = selectItems.length;
    for (var i = 0; i < selectItems.length; ++i) {
        if (selectItems[i].id === "nothingfound") {
            selectItems[i].hidden = true;
        }
        else{
            selectItems[i].hidden = false;
        }
    }
    setValidSelectedItem(selectItems, "");
    setSelectDropDownToCorrectSize(qteOfEntries - 1);
}