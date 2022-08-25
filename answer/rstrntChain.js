var mainPage;   // HTML element that contains the user interface
var dataStore1;  // Array of Restaurants
var dataStore2;  // Array of Users
var storeName1;  // name of saved restaurants in local storage
var storeName2;  // name of saved users in local storage
var activeRstrnt; // currently active Restaurant (for entry and edit)
var activeUsr; // currently active User (for entry and edit)

const STORE_LOAD_OK = 0;
const STORE_EMPTY = 1;
const STORE_INVALID = 2;

function loadDataStore1() {

    // get the restaurant data array from local storage
    var dataArrayJSON = localStorage.getItem(storeName1);

    // if there is no data make an empty restaurant
    if (dataArrayJSON == null ) {
        dataStore1 = [];
        return STORE_EMPTY;
    }

    // read the stored data
    dataStore1 = [];
   
    try {
        var dataArray = JSON.parse(dataArrayJSON1);

        for (dataLine of dataArray) {
            dataStore1[dataStore1.length] = Restaurant.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty restaurant
        dataStore1 = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}

function loadDataStore2() {

    // get the restaurant data array from local storage
    var dataArrayJSON = localStorage.getItem(storeName2);

    // if there is no data make an empty restaurant
    if (dataArrayJSON == null ) {
        dataStore2 = [];
        return STORE_EMPTY;
    }

    // read the stored data
    dataStore2 = [];
   
    try {
        var dataArray = JSON.parse(dataArrayJSON);

        for (dataLine of dataArray) {
            dataStore2[dataStore2.length] = User.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty restaurant
        dataStore2 = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}

function saveDataStore1() {
    var dataArray = [];

    for (item of dataStore1) {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName1, dataJSON);
}

function saveDataStore2() {
    var dataArray = [];

    for (item of dataStore2) {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName2, dataJSON);
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
        { desc: "Unregister Restaurant", label: "Unregister", func: "doUnregisterRestaurant()" },
        { desc: "Modify Restaurant", label: "Modify", func: "doModifyRestaurant()" },
        { desc: "Login User", label: "Login", func: "doLoginUsr()"}
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

function doSaveAdd() {
    activeRstrnt.loadFromHTML();
    activeRstrnt.rstrntRef = Restaurant.getLargestRstrntRef(dataStore1) + 1;
    dataStore1[dataStore1.length] = activeRstrnt;
    alert( activeRstrnt.rstrntRef + " added");
    saveDataStore1();
    doShowMainMenu();
}

function doUnregisterRestaurant() {
    openPage("Unregister ");
    Restaurant.buildElementsFromSchema(mainPage,
        [{ id: "name", prompt: "Name to Unregister", type: "input" }]);
    
    showMenu(
        [{ desc: "Unregister Restaurant", label: "Unregister", func: "doUnregister()" },
        { desc: "Cancel Search", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doUnregister() {
    var unregisterNameElement = document.getElementById("name");
    var unregisterName = unregisterNameElement.value; 

    var flag = unregisterRestaurantName(unregisterName);
    if (flag !== null)
       alert("Restaurant Unregistered");
    else
       alert("Restaurant to unregister not Found!!");
}

function doSearchRestaurants() {
    openPage("Search ");
    Restaurant.buildElementsFromSchema(mainPage, Restaurant.SearchSchema);
       
    showMenu(
        [{ desc: "Search Restaurant", label: "Search", func: "doSearch()" },
        { desc: "Cancel Search", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doSearch() {
    var searchNameElement = document.getElementById("name");
    var searchName = searchNameElement.value;
    
    var searchCuisineElement = document.getElementById("cuisineType");
    var searchCuisine = searchCuisineElement.value;

    var rstRnt = findRestaurantName(searchName);
    var rstRnt1 = findRestaurantCuisine(searchCuisine);

    if (rstRnt != null || rstRnt1 != null)
        alert("Restaurant Found!!");
    else
        alert("Restaurant not Found!!");
    
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

function createListElement1(item) {
    let resultPar = document.createElement("p");

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
    createList("Restaurant List", dataStore1);
    showMenu(
        [{ desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function findRestaurant(rstrntRef) {
    for (let item of dataStore1) {
        if (item.rstrntRef == rstrntRef) {
            return item;
        }
    }
    return null;
}

function findRestaurantName(rstrntName) {
    for (let item of dataStore1) {
        if (item.name == rstrntName) {
            return item;
        }
    }
    return null;
}

function findRestaurantCuisine(rstrntCuisine) {
    for (let item of dataStore1) {
        if (item.cuisineType == rstrntCuisine) {
            return item;
        }
    }
    return null;
}

function unregisterRestaurantName(rstrntName) {
    let index = 0;
    for (let item of dataStore1) {
        if (item.name == rstrntName) {
            dataStore1.splice(index,1);
            return index;
        }
        index++;
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

function doSaveUpdate() {
    activeRstrnt.loadFromHTML();
    alert(activeRstrnt.type + " " + activeRstrnt.rstrntRef + " updated");
    saveDataStore1();
    doShowMainMenu();
}


function doCancelUpdate() {
    doShowMainMenu();
}


function doUpdateRestaurant() {
    openPage("Update Restaurant");
    Restaurant.buildElementsFromSchema(mainPage,
        [{ id: "findRstrntRef", prompt: "Reference", type: "input" }]);

    showMenu(
        [{ desc: "Find Restaurant", label: "Find", func: "doFindRestaurant()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function doFindRestaurant() {
    var searchRefElement = document.getElementById("findRstrntRef");
    var searchRef = searchRefElement.value;

    if (!findRestaurant(searchRef)) {

        alert("Restaurant " + searchRef + " not found");
    }
}

function saveDataStore2() {
    var dataArray = [];

    for (item of dataStore2) {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName2, dataJSON);
}

function doLoginAdd() {
    activeUsr.loadFromHTML();
    activeUsr.usrRef = User.getLargestUsrRef(dataStore2) + 1;
    dataStore2[dataStore2.length] = activeUsr;
    alert( activeUsr.usrRef + " added");
    saveDataStore2();
    doShowMainMenu();
}

function loginUsr(strClass) {
    if (strClass == 'Admin')
      activeUsr = new Admin();
    else
      activeUsr = new Normal();

    openPage("Login " );
    for (let item of dataStore2) {
        let itemPar = createListElement1(item);
        mainPage.appendChild(itemPar);
    }

    activeUsr.getHTML(mainPage);

    showMenu(
        [{ desc: "Login User", label: "Login", func: "doLoginAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doLoginUsr() {
    openPage("Select User Type");
    showMenu(
        [{ desc: "Admin User", label: "Admin", func: "loginUsr('Admin')" },
        { desc: "Normal User", label: "Normal", func: "loginUsr('Normal')" }]);
   // loginUsr(User);
}

/*
function doListUsr() {
    openPage("List Restaurant");
    doListRestaurant();
}
*/

function doStartRestaurant(mainPageId, storeName1ToUse, storeName2ToUse) {
    mainPage = document.getElementById(mainPageId);

    storeName1 = storeName1ToUse;
    storeName2 = storeName2ToUse;

    var loadResult1 = loadDataStore1();

    switch (loadResult1) {
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty restaurant created");
            saveDataStore1();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty restaurant created");
            saveDataStore1();
            break;
    }

    var loadResult2 = loadDataStore2();

    switch (loadResult2) {
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty user created");
            saveDataStore2();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty user created");
            saveDataStore2();
            break;
    }
    doShowMainMenu();
}

