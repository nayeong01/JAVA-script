var mainPage;   // HTML element that contains the user interface
var dataStore;  // Array of Restaurants
var storeName;  // name of save data in local storage
var activeItem; // currently active Restaurant (for entry and edit)

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
        [{ desc: "💧Show Library item", label: "Show", func: "doShowLibrary()" },
        { desc: "💧Search by title", label: "Title", func: "doSearchtitle()" },
        { desc: "💧Search by subject", label: "Subject", func: "doSearchsubject()" },
        { desc: "💧Search by contributor", label: "Contributor", func: "doSearchContributor()" },
        { desc: "💧Register library item", label: "Register", func: "doRegisteritem()" },
        { desc: "💧Unregister library item", label: "Unregister", func: "doUnRegisteritem()" },
        { desc: "💧Modify library item", label: "Modify", func: "doModifyitem()" },]);
}

function doStartLibrary(mainPageId, storeNameToUse) {
    mainPage = document.getElementById(mainPageId);

    storeName = storeNameToUse;

    var loadResult = loadDataStore();

    switch (loadResult) {
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty library created");
            saveDataStore();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty library created");
            saveDataStore();
            break;
    }
    doShowMainMenu();
}


// 등록 아이템 보여주기

function BookList(heading, items) {
    
    openPage(heading);

    for (let item of items) {
        if (item.type == "Author") {
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }

    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}

function CDList(heading, items) {
    
    openPage(heading);

    for (let item of items) {
             if (item.type == "Artist"){
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }

    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}

function DVDList(heading, items) {
    
    openPage(heading);

    for (let item of items) {
         if (item.type == "Director or Actor"){
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }
    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}

function MagazineList(heading, items) {
    
    openPage(heading);

    for (let item of items) {
         if (item.type == "Editor"){
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }
    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}
function doShowLibrary() {
    
    openPage("Item List");

    showMenu(
        [{desc: "book", label:"Book", func:"BookList('Book List',dataStore)"},
        {desc: "CD", label:"CD", func:"CDList('CD List',dataStore)"},
        {desc: "DVD", label:"DVD", func:"DVDList('DVD List',dataStore)"},
        {desc: "magazine", label:"Magazine", func:"MagazineList('Magazine List',dataStore)"}])
    
    //createList("Item List", dataStore);

    showMenu(
        [{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}

function createListElement(item) {
    let resultPar = document.createElement("p");

    let openButton = document.createElement("button");
    openButton.innerText = "Update";
    openButton.className = "itemButton";
    let editFunctionCall = "doUpdateItem('" + item.title + "')";
    openButton.setAttribute("onclick", editFunctionCall);
    resultPar.appendChild(openButton);

    let detailsElement = document.createElement("p");
    detailsElement.innerText = item.getDescription();
    detailsElement.className = "itemList";
    resultPar.appendChild(detailsElement);

    return resultPar;
}


// 아이템 등록하기

function doRegisteritem() {
    doSelectType();
    //addItem(libraryItem);
}

function doSelectType(){

    openPage("Select Item Type");

    showMenu(
        [{desc: "book", label:"Book", func:"addBook(Book)"},
        {desc: "CD", label:"CD", func:"addCD(CD)"},
        {desc: "DVD", label:"DVD", func:"addDVD(DVD)"},
        {desc: "magazine", label:"Magazine", func:"addMagazine(Magazine)"}]
    )
}

function addBook(RstrntClass) {

    activeItem = new RstrntClass();
    
    openPage("Register Book " );

    activeItem.getHTML(mainPage);

    Book.buildElementsFromSchema(mainPage, 
        [{ id: "ISBN", prompt: "ISBN", type: "input" },
        { id: "DDSnumber", prompt: "DDSnumber", type: "input" }]);
    
    showMenu(
        [{ desc: "Save Item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function addCD(RstrntClass) {

    activeItem = new RstrntClass();
    
    openPage("Register CD " );
    
    activeItem.getHTML(mainPage);

    CD.buildElementsFromSchema(mainPage,
        [{ id: "UPC", prompt: "UPC", type: "input" }]);
    
    showMenu(
        [{ desc: "Save Item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function addDVD(RstrntClass) {

    activeItem = new RstrntClass();
    
    openPage("Register DVD " );
    
    activeItem.getHTML(mainPage);

    DVD.buildElementsFromSchema(mainPage,
        [{ id: "genre", prompt: "genre", type: "input" }]);
    
    showMenu(
        [{ desc: "Save Item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function addMagazine(RstrntClass) {

    activeItem = new RstrntClass();
    
    openPage("Register magazine " );
    
    activeItem.getHTML(mainPage);

    Magazine.buildElementsFromSchema(mainPage,
        [{ id: "volume", prompt: "volume", type: "input" },
        { id: "issue", prompt: "issue", type: "input" }]);
    
    showMenu(
        [{ desc: "Save Item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doSaveAdd() {

    activeItem.loadFromHTML();
    activeItem.itemRef = libraryItem.getLargestRstrntRef(dataStore) + 1;
    dataStore[dataStore.length] = activeItem;
    alert( activeItem.itemRef + " added");
    saveDataStore();
    doShowMainMenu();

}

// title 검색

function doSearchtitle(){
    findTitle("title ");
}

function findTitle(Name) {

    openPage(`Search by ${Name} `);

    dataSchema = [{ id: "title", prompt: "title", type: "input" }]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Find Restaurant`, label: `Find`, func: `Search${Name}()` },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);

}
function createTitleList(heading, items, sub){
    openPage(heading);

    for(item of items) {
        if(item.title == sub){
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }
}
function Searchtitle() {  

    var searchRefElement = document.getElementById("title");
    var searchsub = searchRefElement.value;  

    createTitleList("Search by title", dataStore, searchsub);

    showMenu([{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);
}

// subject 검색

function doSearchsubject(){
    findSubject("subject ");
}

function findSubject(Name) {

    openPage(`Search by ${Name} `);

    dataSchema = [{ id: "subject", prompt: "subject", type: "input" }]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Find Restaurant`, label: `Find`, func: `Search${Name}()` },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);

}

function createSubjectList(heading, items, sub){
    openPage(heading);

    for(item of items) {
        if(item.subject == sub){
            let itemPar = createListElement(item);
            mainPage.appendChild(itemPar);
        }
    }
}


function Searchsubject() {  

    var searchRefElement = document.getElementById("subject");
    var searchsub = searchRefElement.value;  

    createSubjectList("Search by subject", dataStore, searchsub);

    showMenu([{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);

}



//contributor 검색

function doSearchContributor(){
    findContributor("contributor ");
}

function findContributor(Name) {

    openPage(`Search by ${Name} `);

    dataSchema = [{ id: "contributor", prompt: "contributor", type: "input" }]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Find Restaurant`, label: `Find`, func: `Search${Name}()` },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);

}

function createContList(heading, items, sub){
    openPage(heading);

    for(item of items) {
        var text = item.contributor;
        for(tex of text){
            if(tex.name.name == sub){
                let itemPar = createListElement(item);
                mainPage.appendChild(itemPar);
            }
        }   
    }
}


function Searchcontributor() {  

    var searchRefElement = document.getElementById("contributor");
    var searchsub = searchRefElement.value;  

    createContList("Search by contributor", dataStore, searchsub);

    showMenu([{ desc: "Cancel", label: "Cancel", func: "doShowMainMenu()" }]);
    
}

function finditem(Name) {

    openPage(`Search by ${Name} `);

    dataSchema = [{ id: "title", prompt: "title", type: "input" },
        { id: "subject", prompt: "subject", type: "input" },
        { id: "contributor", prompt: "contributor", type: "input"}]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Find Restaurant`, label: `Find`, func: `Search${Name}()` },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);

}

function findStartsWithDataPos(name, startPos, type){
    
    name = name.toLowerCase();

    var pos = startPos;

    do {
        // repeat this code while the test
        // at the end of the loop is true
        if (type == "title"){
        let storedName = dataStore[pos].title;
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
    }
        if (type =="subject") {
            let storedName = dataStore[pos].subject;
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
        }

        if (type =="contributor") {
            var data = dataStore[pos].contributor;
                for(cotb of data){
                    var lowerCaseStoredName =cotb.name.name.toLowerCase();
                    if (lowerCaseStoredName.startsWith(name)) {
                        return pos;
                    }
                }       
                    // move down the data
                    pos = pos + 1;

                    // if we have reached the end of the data - wrap round
                    if (pos == dataStore.length) {
                    pos = 0;
                }
        }
        // stop when we get back to where we started
    } while (pos != startPos)

    return NaN;
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
    var list = [];
    if (id == "contributor"){
        for(cot of text){
            var ctrb = cot.name.name;
            list.push(ctrb);
            element.value = list;
        }
    }
}


// 목록 삭제하기

function doUnRegisteritem(){
    doUnregister("Unregister ");
}

function doUnregister(Name) {
    openPage(`${Name} Item`);

    dataSchema = [{ id: "name", prompt: "Name", type: "input" }]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Unregister Restaurant`, label: `Unresgister`, func: "Unregisteritem()" },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);
}

function Unregisteritem(){

    var searchRefElement = document.getElementById("name");
    var searchRef = searchRefElement.value;

    var pos = findStartsWithDataPos(searchRef, 0, "title");

    if(isNaN(pos)){
        alert("Restaurant " + searchRef + " not found");
    } else {
        dataStore.splice(pos, 1);
        alert(searchRef+ " is unregister!");
    }
}


//아이템 수정하기

function doModifyitem(){
    domodify("Modify ");
}

function domodify(Name) {
    openPage(`${Name}`);

    dataSchema = [{ id: "name", prompt: "Name", type: "input" }]

    libraryItem.buildElementsFromSchema(mainPage,dataSchema);

    showMenu(
        [{ desc: `Modify Restaurant`, label: `Modify`, func: "Modifyitem()" },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);
}

function Modifyitem() {

    var searchRefElement = document.getElementById("name");
    var searchRef = searchRefElement.value;

    var pos = findStartsWithDataPos(searchRef, 0, "title");

    if(isNaN(pos)){
        alert("Restaurant " + searchRef + " not found");
    } else {
        doUpdateItem(searchRef);
    }

}

function dofinditem(name) {

    for (let item of dataStore) {
        if (item.title == name) {
            return item;
        }
    }
    return null;
}

function doUpdateItem(name) {

    var rstrnt = dofinditem(name);
    var itemName = rstrnt.title;
    var pos = findStartsWithDataPos(itemName, 0, "title");

    if (rstrnt == null) {
        return false;
    }

    activeItem = rstrnt;

    openPage("Update "  + name);

    if(rstrnt.type == "Author"){

        dataSchema = [{ id: "title", prompt: "title", type: "input" },
        { id: "subject", prompt: "subject", type: "input" },
        { id: "contributor", prompt: "contributor", type: "input"},
        { id: "ISBN", prompt: "ISBN", type: "input" },
        { id: "DDSnumber", prompt: "DDSnumber", type: "input" }]

        Book.buildElementsFromSchema(mainPage, dataSchema);
        displayData(pos);
    } if (rstrnt.type == "Artist"){

        dataSchema = [{ id: "title", prompt: "title", type: "input" },
        { id: "subject", prompt: "subject", type: "input" },
        { id: "contributor", prompt: "contributor", type: "input"},
        { id: "UPC", prompt: "UPC", type: "input" }]

        Book.buildElementsFromSchema(mainPage, dataSchema);

        displayData(pos);
    } if(rstrnt.type == "Director or Actor"){

        dataSchema = [{ id: "title", prompt: "title", type: "input" },
        { id: "subject", prompt: "subject", type: "input" },
        { id: "contributor", prompt: "contributor", type: "input"},
        { id: "genre", prompt: "genre", type: "input" }]

        Book.buildElementsFromSchema(mainPage, dataSchema);

        displayData(pos);

    } if(rstrnt.type == "Editor"){

        dataSchema = [{ id: "title", prompt: "title", type: "input" },
        { id: "subject", prompt: "subject", type: "input" },
        { id: "contributor", prompt: "contributor", type: "input"},
        { id: "volume", prompt: "volume", type: "input" },
        {id: "issue", prompt:"issue", type:"input"}]

        Book.buildElementsFromSchema(mainPage, dataSchema);

        displayData(pos);
    }

    showMenu(
        [{ desc: "Save updates", label: "Save", func: "doSaveUpdate()" },
        { desc: "Cancel updates", label: "Cancel", func: "doShowMainMenu()" }]);

    return true;
}

function doSaveUpdate() { // 수정하고 나서 부르면 되겠다
    activeItem.loadFromHTML();
    alert(activeItem.title +" is updated");
    saveDataStore();
    doShowMainMenu();
}