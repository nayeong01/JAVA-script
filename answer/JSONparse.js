static JSONparse(text) {
        var rawObject = JSON.parse(text); // 객체로 만들기
        var result = null;

        switch (rawObject.type) {
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

static Contri(cont) {
    var rawObject = JSON.parse(cont);
    var result = null;
    result = new ContributorWithType();
    Object.assign(result, rawObject);
    return result;
}