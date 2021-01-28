function adjustSelectItems(){
    let selectItems = getAllItemsInSelect();
    let filter = getUserEntry();
    filterSelectItems(selectItems, filter);
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

/* Ajoute le comportement de click au bouton */
window.onload=function (){
    document.getElementById("xbutton").addEventListener("click", function(){
        resetUserEntryValue();
        resetItemsComboboxView();
    })
}

function resetUserEntryValue(){
    var userEntry = document.getElementById("userentry");
    userEntry.value = "";
}

function resetItemsComboboxView(){
    var selectItems = getAllItemsInSelect();
    var qteOfEntries = selectItems.length;
    console.log("Entries : ", qteOfEntries);
    for (var i = 0; i < selectItems.length; ++i) {
        if (selectItems[i].id === "nothingfound") {
            selectItems[i].hidden = true;
            console.log("nothing found !");
        }
        else{
            selectItems[i].hidden = false;
        }
    }
    setValidSelectedItem(selectItems, "");
    setSelectDropDownToCorrectSize(qteOfEntries - 1);

}
