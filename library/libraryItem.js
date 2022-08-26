class libraryItem {

    static getLargestRstrntRef(items) {
        if (items.length == 0) {
            return 0;
        }

        var largest = items[0].itemRef;

        for (const item of items) {
            if (item.itemRef > largest) {
                largest = item.itemRef;
            }
        }

        return largest;
    }


    static makeElement(description) {
        // Create the enclosing paragraph
        var inputPar = document.createElement("p");

        // Create the label for the element
        var labelElement = document.createElement("label");
        labelElement.innerText = description.prompt + ":";
        labelElement.className = "inputLabel";
        labelElement.setAttribute("for", description.id);
        inputPar.appendChild(labelElement);

        var inputElement;

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

        // set the id for the element
        inputElement.setAttribute("id", description.id);
        // give the element an initial value
        inputElement.setAttribute("value", "");
        // add the element to the paragraph
        inputPar.appendChild(inputElement);
        // return the whole paragraph
        return inputPar;
    }

    static RestaurantSchema = [
        { id: "title", prompt: "Title", type: "input"},
        { id: "subject", prompt: "Subject", type: "input" },
        { id: "contributor", prompt: "Contributor", type: "input"}
        ];

    static buildElementsFromSchema(HTMLdisplay, dataSchema) {
        // work through each of the items in the schema
        for (let item of dataSchema) {
            // make an element for that item
            let itemElement = libraryItem.makeElement(item);
            // add the element to the container
            HTMLdisplay.appendChild(itemElement);
        }
    }

    static JSONparse(text) {
        var rawObject = JSON.parse(text); // 객체로 만들기
        var result = null;

        switch (text) {
            case "book":
                result = new Book();
                break;
            case "CD":
                result = new CD();
                break;
            case "DVD":
                result = new DVD();
                break;
            case "Magazine":
                result = new Magazine();
                break;
        }

        Object.assign(result, rawObject); // 이건 뭐지?
        return result;
    }

    constructor(itemRef, title, subject, contributor) {
        this.itemRef = itemRef;
        this.title = title;
        this.subject = subject;
        this.contributor = contributor;
    }

    getDescription() {
        var text = this.contributor;
        var conlist = [];

        for(let cot of text){
            var ctrb = cot.name.name;
            conlist.push(ctrb);
        }

        var result = this.itemRef + ". "+
            " Title:" + this.title +
            " Subject:" + this.subject +
            " Contributor:" + conlist;

        return result;
    }

    sendToHTML() {
        // work through each of the restaurants in the object
        let contList = [];
        for (let item in this) {
            if ( item == "itemRef" || item == "type") {
                // don't add the type or rstrntkref to the HTML
                continue;
            } if (item =="contributor"){

                let itemElement = document.getElementById(item);

                var contArr = itemElement.value.split(',');

                for(let i=0; i<contArr.length; i++){
                    let cotrbt = new ContributorWithType(contArr[i],"type");
                    contList.push(cotrbt);

                }
                contList=this[item];
                continue;
            }
            // get the element to send to
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            itemElement.value = this[item];
        }
    }

    loadFromHTML() {
        // work through each of the restaurants in the object
        let contList = [];

        for (let item in this) {
            if ( item == "itemRef"|| item == "type") {
                // don't load the type or stockref from the HTML
                continue;
            }
            if (item =="contributor"){
                let itemElement = document.getElementById(item);

                var contArr = itemElement.value.split(',');

                for(let i=0; i<contArr.length; i++){
                    var type1 = this.type;
                    let cotrbt = new ContributorWithType(contArr[i], type1);
                    contList.push(cotrbt);
                }
                this[item] = contList;
                continue;
            }
            // get the element to load from
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            this[item] = itemElement.value;
        }
    }

   
    getHTML(containerElementId) {
        libraryItem.buildElementsFromSchema(containerElementId, libraryItem.RestaurantSchema);
    }

    JSONstringify() {
        return JSON.stringify(this);
    }
    
}

class Book extends libraryItem{
    constructor(title, subject, contributor, ISBN, DDSnumber){
        super(title, subject, contributor)
        this.type = "Author";
        this.ISBN = ISBN;
        this.DDSnumber = DDSnumber;
    }
}

class CD extends libraryItem{
    constructor(title, subject, contributor, UPC){
        super(title, subject, contributor)
        this.type = "Artist";
        this.UPC =UPC;
    }
}

class DVD extends libraryItem{
    constructor(title, subject, contributor, genre){
        super(title, subject, contributor)
        this.type = "Director or Actor";
        this.genre = genre;
    }
}

class Magazine extends libraryItem{
    constructor(title, subject, contributor, volume, issue){
        super(title, subject, contributor)
        this.type = "Editor";
        this.volume = volume;
        this.issue = issue;
    }
}

class ContributorWithType{
    constructor(name, type){
        this.type = type;
        this.name = new Contributor(name);
    }

    describeContributor(){
        var list = [];
        var conts = this.name;
        for(cont of conts){
            var ctrb = cont.name.name;
            list.push(ctrb);
        }
        return list;
    }
}

class Contributor{
    constructor(name){
        this.name = name;
    }
}