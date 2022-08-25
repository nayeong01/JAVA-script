var mainPage;   // HTML element that contains the user interface
var dataStore;  // Array of Restaurants
var storeName;  // name of save data in local storage
var activeRstrnt; // currently active Restaurant (for entry and edit)

const STORE_LOAD_OK = 0;
const STORE_EMPTY = 1;
const STORE_INVALID = 2;

function loadDataStore() {

    // get the data array from local storage
    var dataArrayJSON = localStorage.getItem(storeName);

    // if there is no data make an empty restaurant
    if (dataArrayJSON == null) {
        dataStore = [];
        return STORE_EMPTY;
    }

    // read the stored contacts
    dataStore = [];

    try {
        var dataArray = JSON.parse(dataArrayJSON);

        for (dataLine of dataArray) {
            dataStore[dataStore.length] = Restaurant.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty restaurant
        dataStore = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}

function saveDataStore() {
    var dataArray = [];

    for (item of dataStore) {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName, dataJSON);
}


function clearPage() {
    // clear the display
    while (mainPage.children.length > 0)
        mainPage.removeChild(mainPage.children[0]);
}

function openPage(title) {
    clearPage();
    let titlePar = document.createElement("p");
    titlePar.innerText = title;
    titlePar.className = "pageTitle";
    mainPage.appendChild(titlePar);
}

function showMenu(schema) {
    for (const buttonDesc of schema) {
        let buttonPar = document.createElement("p");
        buttonPar.className = "menuPar";

        let descriptionPar = document.createElement("p");
        descriptionPar.innerText = buttonDesc.desc;
        descriptionPar.className = "menuButtonCaption";
        buttonPar.appendChild(descriptionPar);

        let button = document.createElement("button");
        button.innerText = buttonDesc.label;
        button.className = "menuButton";
        button.setAttribute("onclick", buttonDesc.func);
        buttonPar.appendChild(button);

        mainPage.appendChild(buttonPar);
    }
}

function doShowMainMenu() {
    openPage("Main Menu");

    showMenu(
        [{ desc: "Show Restaurants", label: "Show", func: "doShowRestaurants()" },
        { desc: "Search Restaurants", label: "Search", func: "doSearchRestaurants()" },
        { desc: "Register Restaurant", label: "Register", func: "doRegisterRestaurant()" },
        { desc: "Unregister Restaurant", label: "Unregister", func: "doUnregisterRestaurnat()" },
        { desc: "Modify Restaurant", label: "Modify", func: "doModifyRestaurant()" },
        ]);
}

function addRestaurant(RstrntClass) {

    activeRstrnt = new RstrntClass();

    openPage("Register " );

    activeRstrnt.getHTML(mainPage);

    showMenu(
        [{ desc: "Save Restaurant", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doRegisterRestaurant() {
      addRestaurant(Restaurant);
}

function doUnregisterRestaurnat(){
    doUnregisterRestaurant("Unregister ");
}

function findStartsWithDataPos(name, startPos){
    
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

function doSearchRestaurants(){
    doUpdateRestaurant("Search ");
}

function doModifyRestaurant(){
    domodifyRestaurant("Modify ");
}

function doSaveAdd() {
    activeRstrnt.loadFromHTML();
    activeRstrnt.rstrntRef = Restaurant.getLargestRstrntRef(dataStore) + 1;
    dataStore[dataStore.length] = activeRstrnt;
    alert( activeRstrnt.rstrntRef + " added");
    saveDataStore();
    doShowMainMenu();
}

function createListElement(item) {
    let resultPar = document.createElement("p");

    let openButton = document.createElement("button");
    openButton.innerText = "Update";
    openButton.className = "itemButton";
    let editFunctionCall = "doUpdateItem('" + item.rstrntRef + "')";
    openButton.setAttribute("onclick", editFunctionCall);
    resultPar.appendChild(openButton);

    let detailsElement = document.createElement("p");
    detailsElement.innerText = item.getDescription();
    detailsElement.className = "itemList";
    resultPar.appendChild(detailsElement);

    return resultPar;
}

function createList(heading, items) {
    openPage(heading);
    for (let item of items) {
        let itemPar = createListElement(item);
        mainPage.appendChild(itemPar);
    }
}

function doShowRestaurants() {
    createList("Restaurant List", dataStore);

    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}

function findRestaurant(rstrntRef) {

    for (let item of dataStore) {
        if (item.rstrntRef == rstrntRef) {
            return item;
        }
    }
    return null;
}

function doUpdateItem(rstrntRef) {

    var rstrnt = findRestaurant(rstrntRef);

    if (rstrnt == null) {
        return false;
    }

    activeRstrnt = rstrnt;

    openPage("Update "  + rstrntRef);

    rstrnt.getHTML(mainPage);

    rstrnt.sendToHTML();

    showMenu(
        [{ desc: "Save updates", label: "Save", func: "doSaveUpdate()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);

    return true;
}

function doSaveUpdate() { // 수정하고 나서 부르면 되겠다
    activeRstrnt.loadFromHTML();
    alert(activeRstrnt.type + " " + activeRstrnt.stockRef + " updated");
    saveDataStore();
    doShowMainMenu();
}


function doCancelUpdate() { // 이건 메뉴로 돌아가는 함수
    doShowMainMenu();
}


function doUpdateRestaurant(Name) { // 수정에 쓰이는건가?
    openPage(`${Name} Restaurant`);
    dataSchema = [{ id: "name", prompt: "Name", type: "input" },
        { id: "cuisineType", prompt: "Cuisine Type", type: "input" },
        { id: "description", prompt: "Description", type: "textarea", rows: 5, cols: 40 }
        ]
    Restaurant.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Find Restaurant`, label: `Find`, func: "doFindRestaurant()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function doUnregisterRestaurant(Name) {
    openPage(`${Name} Restaurant`);

    dataSchema = [{ id: "name", prompt: "Name", type: "input" }]

    Restaurant.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Unregister Restaurant`, label: `Unresgister`, func: "UnregisterRestaurant()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function domodifyRestaurant(Name) {
    openPage(`${Name} Restaurant`);

    dataSchema = [{ id: "name", prompt: "Name", type: "input" }]

    Restaurant.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Modify Restaurant`, label: `Modify`, func: "ModifyRestaurant()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function ModifyRestaurant() {

    var searchRefElement = document.getElementById("name");
    var searchRef = searchRefElement.value;

    var pos = findStartsWithDataPos(searchRef, 0);

    if(isNaN(pos)){
        alert("Restaurant " + searchRef + " not found");
    } else {
        doUpdateItem(pos+1);
    }


}

function doFindRestaurant() { // 위에 find 버튼 누르면 실행된다. 
                              // value가 없으면 찾을 수 없다는 경고문
                              // 그럼 있을 경우엔?
    var searchRefElement = document.getElementById("name");
    var searchRef = searchRefElement.value;

    var pos = findStartsWithDataPos(searchRef, 0);

    if (isNaN(pos)) {
        alert("Restaurant " + searchRef + " not found");
    } else {
        displayData(pos);
    }
}

function UnregisterRestaurant(){

    var searchRefElement = document.getElementById("name");
    var searchRef = searchRefElement.value;

    var pos = findStartsWithDataPos(searchRef, 0);

    if(isNaN(pos)){
        alert("Restaurant " + searchRef + " not found");
    } else {
        dataStore.splice(pos, 1);
        alert(searchRef+ "is unregister!");
    }
}

function displayData(pos) {

    var data = dataStore[pos];

    for (item of dataSchema) {
        displayElement(item.id, data[item.id]);
    }
}

function displayElement(id, text) {

    var element = document.getElementById(id);

    element.value = text;
    
    }


function doListStock() { //얜 뭐야
    openPage("List Restaurant");
    doListRestaurant();
}

function doStartRestaurant(mainPageId, storeNameToUse) {
    mainPage = document.getElementById(mainPageId);

    storeName = storeNameToUse;

    var loadResult = loadDataStore();

    switch (loadResult) {
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty restaurant created");
            saveDataStore();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty restaurant created");
            saveDataStore();
            break;
    }
    doShowMainMenu();
}

