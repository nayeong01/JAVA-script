class Restaurant {

    static getLargestRstrntRef(restaurants) {
        if (restaurants.length == 0) {
            return 0;
        }

        var largest = restaurants[0].rstrntRef;

        for (const rstrnt of restaurants) {
            if (rstrnt.rstrntRef > largest) {
                largest = rstrnt.rstrntRef;
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
        { id: "name", prompt: "Name", type: "input"},
        { id: "cuisineType", prompt: "Cuisine Type", type: "input" },
        { id: "description", prompt: "Description", type: "textarea", rows: 5, cols: 40 }
        ];

    static buildElementsFromSchema(HTMLdisplay, dataSchema) {
        // work through each of the items in the schema
        for (let item of dataSchema) {
            // make an element for that item
            let itemElement = Restaurant.makeElement(item);
            // add the element to the container
            HTMLdisplay.appendChild(itemElement);
        }
    }

    constructor(rstrntRef, name, cuisineType, description, numberServed=0) {
        this.rstrntRef = rstrntRef;
        this.name = name;
        this.cuisineType = cuisineType;
        this.description = description;
        this.numberServed = numberServed;
    }

    getDescription() {
        var result = "Ref:" + this.rstrntRef +
            " Name:" + this.name +
            " Cuisine Type:" + this.cuisineType +
            " Description:" + this.description +
            " numberServed:" + this.numberServed;

        return result;
    }

    sendToHTML() {
        // work through each of the restaurants in the object
        for (let item in this) {
            if ( item == "rstrntRef" || item == "numberServed") {
                // don't add the type or rstrntkref to the HTML
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
        for (let item in this) {
            if ( item == "rstrntRef" || item == "numberServed") {
                // don't load the type or stockref from the HTML
                continue;
            }
            // get the element to load from
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            this[item] = itemElement.value;
        }
    }

   
    getHTML(containerElementId) {
        Restaurant.buildElementsFromSchema(containerElementId, Restaurant.RestaurantSchema);
    }

    JSONstringify() {
        return JSON.stringify(this);
    }
    
}
