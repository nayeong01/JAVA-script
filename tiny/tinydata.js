var dataStore = [];

var storeName;

function loadDataStore() {

    var dataString = localStorage.getItem(storeName);

    if (dataString == null) {
        dataStore = [];
        return false;
    }

    dataStore = JSON.parse(dataString);

    return true;
}

function saveDataStore() {

    var storeJson = JSON.stringify(dataStore);

    localStorage.setItem(storeName, storeJson);
}

function displayElementValue(id, text) {
    var element = document.getElementById(id);
    element.value = text;
}

function getElementValue(id) {
    var element = document.getElementById(id);
    return element.value;
}

function displayDataNotFound() {
    alert("Not found");
}

function displayElement(id, text) {
    var element = document.getElementById(id);
    element.value = text;
}

function displayData(pos) {

    var data = dataStore[pos];

    for (item of dataSchema) {
        displayElement(item.id, data[item.id]);
    }
}


function storeData(pos) {
    // Create an empty data item
    var newData = {};

    // Work through the data schema
    for (property of dataSchema) {
        // Get the data out of the HTML element
        let itemData = getElementValue(property.id);
        // Create a property to store that data
        newData[property.id] = itemData;
    }
    // put the new data in the storage array
    dataStore[pos] = newData;

    // save the data store 
    saveDataStore();
}

function findDataPos(name) {
    name = name.toLowerCase();
    for (let pos = 0; pos < dataStore.length; pos = pos + 1) {
        let storedName = dataStore[pos].name;
        if (storedName.toLowerCase() == name) {
            return pos;
        }
    }
    return NaN;
}

function findStartsWithDataPos(name, startPos) {

    name = name.toLowerCase();

    var pos = startPos;

    do {
        // repeat this code while the test 
        // at the end of the loop is true

        let storedName = dataStore[pos].name;
        var lowerCaseStoredName = storedName.toLowerCase();
        if (lowerCaseStoredName.startsWith(name)) {
            return pos;
        }

        // move down the data
        pos = pos + 1;

        // if we have reached the end of the data - wrap round
        if (pos == dataStore.length) {
            pos = 0;
        }

        // stop when we get back to where we started
    } while (pos != startPos)

    return NaN;
}

function makeElement(description) {
    // Create the enclosing paragraph
    var inputPar = document.createElement("p");

    // Create the label for the element
    var labelElement = document.createElement("label");
    labelElement.innerText = description.prompt + ":";
    labelElement.className = "inputLabel";
    labelElement.setAttribute("for", description.id);
    inputPar.appendChild(labelElement);

    // decide what kind of element to make
    switch (description.type) {
        case "input":
            inputElement = document.createElement("input");
            inputElement.className = "inputText";
            break;

        case "textarea":
            inputElement = document.createElement("textarea");
            inputElement.className = "inputTextarea";
            inputElement.setAttribute("rows", description.rows);
            inputElement.setAttribute("cols", description.cols);
            break;
        // add new kinds of element here
    }

    // special handling for the name input which 
    // must reset the find when it is changed

    if (description.id == "name") {
        inputElement.setAttribute("oninput", "resetFind();");
    }

    // set the id for the element
    inputElement.setAttribute("id", description.id);
    // give the element an initial value
    inputElement.setAttribute("value", "");
    // add the element to the paragraph
    inputPar.appendChild(inputElement);
    // return the whole paragraph
    return inputPar;
}


function doBuildPage(containerElementID, schema) {

    // store the schema for use later by the application
    dataSchema = schema;

    // get a reference to the element containing the edit items
    var containerElement = document.getElementById(containerElementID);

    // work through each of the items in the schema
    for (item of dataSchema) {
        // make an element for that item
        let itemElement = makeElement(item);
        // add the element to the container
        containerElement.appendChild(itemElement);
    }
}

function doSave() {

    // get the name of the data being saved
    var name = getElementValue("name");

    // find the position of the name to save
    var pos = findDataPos(name);

    if (isNaN(pos)) {
        // if we didn't find an existing data name
        // we put the data on the end of the array
        pos = dataStore.length;
    }

    storeData(pos);
}

var findString = "";
var findPos = 0;

function resetFind() {
    nameString = getElementValue("name");
    findString = nameString.trim();
    findPos = 0;
}

function doFind() {

    var pos = findStartsWithDataPos(findString, findPos);

    if (isNaN(pos)) {
        displayDataNotFound();
    }
    else {
        displayData(pos);
        findPos = pos + 1;
        if (findPos == dataStore.length) {
            findPos = 0;
        }
    }
}


function doStartTinyData(storeNameToUse) {
    storeName = storeNameToUse;

    if (!loadDataStore()) {
        alert("Empty store created");
    }

}

function clearElement(id) {
    var element = document.getElementById(id);
    element.value = "";
}

function doClear() {
    // work through each of the items in the schema
    for (item of dataSchema) {
        clearElement(item.id);
    }
}