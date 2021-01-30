var selectBar = document.querySelectorAll(".colorselect")[0];
var maxElements = parseInt(selectBar.getAttribute("maxelements"), 10);
console.log("Nombre maximal d'éléments : ", maxElements);

var itemsQte = getAllItemsInSelect().length - 1;
setSelectDropDownToCorrectSize(itemsQte)
hideSelectBox();