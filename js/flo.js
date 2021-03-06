var currScene, option = 0;
var currItem, bagStatus = "closed", bagItem = 0;
var bagContent = ["stone"];
var dungeonOptions = ["a pile of ruins.", "a div container.", "the gateway.", "Ben."];
var dungeon2Options = ["a troll face.", "the link.", "a spoon.", "a key."];


// keyboard input
document.onkeydown = checkKey;
function checkKey(k){
    switch(k.keyCode){
    // up arrow - interact
    case 38:
        if(bagStatus == "closed"){
            window["interact"][currScene]();
        }else if(bagStatus == "open"){
            bagInteraction();
        }
        break;
    // left arrow
    case 37 :
        if(bagStatus == "closed"){
            document.getElementById("info").innerHTML = "";
            window["view"][currScene](-1);
        }else if(bagStatus == "open"){
            bag(-1);
        }
        break;
    // right arrow
    case 39:
        if(bagStatus == "closed"){
            document.getElementById("info").innerHTML = "";
            window["view"][currScene](1);
        }else if(bagStatus == "open"){
            bag(1);
        }
        break;
    // down arrow - bag open/close
    case 40:
        bagOpen();
        break;
    case 32:
    // space - menu
        showHelp();
    default:
    }
}


// help
function showHelp(){
    var x = document.getElementById("instruction");
    if(window.getComputedStyle(x).display === "none"){
        document.getElementById("instruction").style.display = "block";
    }else{
        document.getElementById("instruction").style.display = "none";
    }
}


// bag
function bagOpen(){
    // open bag
    if(bagStatus == "closed"){
        document.getElementById("bagLabel").innerHTML = "Bag: ";
        if(bagContent.length === 0){
            bagStatus = "empty";
            document.getElementById("bag").innerHTML = "bag is empty";
        }else{
            bagStatus = "open";
            bagItem = 0;
            document.getElementById("bag").innerHTML = bagContent[0];
        }
    // close bag
    }else{
        bagStatus = "closed";
        document.getElementById("bagLabel").innerHTML = "";
        document.getElementById("bag").innerHTML = "";
    }

}

function bag(i){

    // switch bag items
    bagItem += i;

    // cycle
    if(bagItem > (bagContent.length - 1)){
        bagItem -= bagContent.length;
    }else if(bagItem < 0){
        bagItem = (bagContent.length - 1);
    }

    // print current bag item
    return document.getElementById("bag").innerHTML = bagContent[bagItem];
}
function bagInteraction(){
    // deselect hand item
    if(currItem == bagContent[bagItem]){
        currItem = "";
        document.getElementById("handLabel").innerHTML = "";
        document.getElementById("hand").innerHTML = "";
        return;
    // select hand item
    }else{
        currItem = bagContent[bagItem];
        document.getElementById("handLabel").innerHTML = "Hand: ";
        document.getElementById("hand").innerHTML = "[" + currItem + "]";
        return;
    }
}

// views
var view = {
    
    dungeon: function(v){
        // init
        if(v == 0){
            option = 0;
            currScene = "dungeon";
            document.cookie = "currScene=dungeon";
            document.getElementById("location").innerHTML = "the Coding Dungeon.";
        // change current view
        }else{
            option += v;
        }
        
        // cycle
        if(option > (dungeonOptions.length - 1)){
            option -= dungeonOptions.length;
        }else if(option < 0){
            option = dungeonOptions.length - 1;
        }

        // print current view
        return document.getElementById("view").innerHTML = dungeonOptions[option];
    },

    dungeon2: function(v){
        // init
        if(v == 0){        
            option = 0;
            currScene = "dungeon2";
            document.cookie = "currScene=dungeon2";
            document.getElementById("location").innerHTML = "the stylesheet";
        // change current view
        }else{
            option += v;
        }
        
        // cycle
        if(option > (dungeon2Options.length - 1)){
            option -= dungeon2Options.length;
        }else if(option < 0){
            option = dungeon2Options.length - 1;
        }

        // print current view
        return document.getElementById("view").innerHTML = dungeon2Options[option];
    },
};

// interactions
var interact = {
    dungeon: function(){
        switch(option){
        case 0:
            document.getElementById("info").innerHTML = "Here you tested your code.";
            return;
        // dirty sheet / tunnel
        case 1:
            // remove sheet
            if(dungeonOptions[1] == "a div container."){
                dungeonOptions[1] = "a link.";
                document.cookie = "dungeonOptions[1]=a link.";
                document.getElementById("view").innerHTML = dungeonOptions[1];
                document.getElementById("info").innerHTML = "You looked into the div and found a link.";
                return;
            // move to dungeon2
            }else if(dungeonOptions[1] == "a link."){
                option = 0;
                currScene = "dungeon2";
                document.cookie = "currScene=dungeon2";
                document.getElementById("location").innerHTML = "the stylesheet";
                document.getElementById("info").innerHTML = "You used the link to a stylesheet.";
                document.getElementById("view").innerHTML = dungeon2Options[option];
                return;
            }
        // door
        case 2:
            if(dungeonOptions[2] == "the gateway."){
                if(currItem == "key"){
                    bagContent.splice(bagContent.indexOf("key"), 1);
                    dungeonOptions[2] = "the opened Door.";
                    document.cookie = "dungeonOptions[2]=the opened door.";
                    document.cookie = "bagContent-=key"; //fix this
                    document.getElementById("view").innerHTML = dungeonOptions[2];
                    document.getElementById("info").innerHTML = "You opened the gateway.";
                    document.getElementById("handLabel").innerHTML = "";
                    document.getElementById("hand").innerHTML = "";
                    return;
                }else{
                    document.getElementById("info").innerHTML = "The gateway is encrypted.";
                    return;
                }
            }else if(dungeonOptions[2] == "the opened Door."){
                document.getElementById("view").innerHTML = "VSCode again!";
                document.getElementById("info").innerHTML = "Congratulations, you passed Ben's test ;)";
                return;
            }
        case 3:
            document.getElementById("info").innerHTML = "Hi, I'm Ben, the Web-Dev master!";
            return;
        }
    },
    
    dungeon2: function(){
        switch(option){
        case 0:
            document.getElementById("info").innerHTML = "It looks the way you feel right now.";
            return;
        // move back to dungeon1
        case 1:
            option = 0;
            currScene = "dungeon";
            document.cookie = "currScene=dungeon";
            document.getElementById("location").innerHTML = "the Coding Dungeon";
            document.getElementById("info").innerHTML = "You went back to the index file.";
            document.getElementById("view").innerHTML = dungeonOptions[option];
            return;
        case 2:
            document.getElementById("info").innerHTML = "NO, it's not break time right now.";
            return;
        // key
        case 3:
            if(dungeon2Options.includes("a key.")){
                dungeon2Options[3] = "an empty place."
                bagContent.push("key");
                document.cookie = "dungeon2Options[3]=an empty place";
                document.cookie = "bagContent+=key"; //fix this
                document.getElementById("view").innerHTML = dungeon2Options[3];
                document.getElementById("info").innerHTML = "You put the key into your keyring.";
                return;
            }else{
                document.getElementById("info").innerHTML = "It's nothing here anymore.";
                return;
            }   
        }
    },
};
