//In JavaScript, DOM stands for Document Object Model. 
//It is a programming interface for web documents that represents the structure of a web page as a hierarchical tree of objects (or nodes). 
//Each part of the HTML document (such as elements, attributes, and text) is represented as an object that can be accessed and manipulated using JavaScript.


//Every HTML tag (such as <div>, <p>, <h1>, etc.) is represented as an element (or node) in the DOM.
//For example, an HTML element like <div id="main">Hello</div> is represented in the DOM as an element node with attributes (id="main") and a text node (Hello).

//JavaScript can be used to access and manipulate the DOM, allowing developers to dynamically change the content, structure, and style of a web page.
//document.getElementById('main').innerHTML = "New content";

//variable
let str = "Hello";
let num = 123;
let bool = true;
let arr = [1, 2, 3];
let obj = { name: "Bob" };


//condition
let score = 80;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else {
    console.log("C");
}

//for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

//function
function greet(name) {
    
    return "Hello " + name;
}

console.log(greet("Alice"));



//video code
console.log("Hi");
let count = 0;
let button; //click event
let colorButton; //change color
let addButton;  //add new element to current content
let choice = 0;

let bgColors = ['cyan', 'pink', 'yellow', 'green'];


//Steps
//1. identify and select the button
button = document.getElementById("buttonCounter");



//2. listen to event click on the button
//(Evt you want to listen, Callback function)
//A callback function is a function that is passed as an argument to another function and is executed after some operation is completed.
button.addEventListener("click", increaseCounter);

//3. increase the number in the counter
function increaseCounter() {
    count += 1;
    document.getElementById('counter').innerHTML = count;
    console.log("Counter Increase!");

    //remove a event listener from an element
    //button.removeEventListener("click",increaseCounter);

}


//another way of writing this is:
/* button.addEventListener("click", function(){
    count+=1;
    document.getElementById('counter').innerHTML=count;
    console.log("Counter Increase!");
}); */



//button to change background color
colorButton = document.getElementById('colorButton');

//events on button
//click, mouseover, mouseout

colorButton.addEventListener("mouseout", function () {
    console.log("Change yellow when mouse left button!");
    document.body.style.background = "yellow";
    colorButton.style.background = "red";
    document.getElementById('colorButton').innerHTML = "Change Color";
});

colorButton.addEventListener("mouseover", function () {
    console.log("Change red when mouse hover on button!");
    document.body.style.background = "brown";
    document.getElementById('colorButton').innerHTML = "Do I look brown?";

});

//click to switch to next color in array bgColors
colorButton.addEventListener("click", function () {
    console.log("Change blue when click on button!");
    document.body.style.background = bgColors[choice];
    choice = (choice + 1) % 4;
    document.getElementById('colorButton').innerHTML = "Guess not.";
});


//check for scrolling for window
window.addEventListener("scroll", function () {
    console.log(window.scrollY);
    document.body.style.background = "hsl(" + this.window.scrollY % 360 + ",50%,50%)";
});

//add new element to contents
//variables
let newID = "newP";
let divContainer = document.getElementById("words");
let newElement;
let texts = ["Line A", "Line B", "Line C"]

//select the addButton
addButton = document.getElementById("addButton");

//add event to mouse over button 
//append element to div
addButton.addEventListener("mouseover", function () {
    newElement = document.createElement("p");
    newElement.id = newID;
    newElement.textContent = "I am saying this!";
    divContainer.appendChild(newElement);
});

//add event to mouse leaves button
//remove certain element from div
addButton.addEventListener("mouseleave", function () {
    let elementToRemove = document.getElementById(newID);
    if (elementToRemove) {
        divContainer.removeChild(newElement);
    } else {
        console.log("not added yet.")
    }
});

let imgElement = document.getElementById("myImage");
let currentImgIndex = 0;
//add event to mouse click button
//change image
addButton.addEventListener("click", function () {
    if (currentImgIndex == 0) {
        imgElement.src = "IMG/Floatineer.jpg";
        imgElement.alt = "New Placeholder Image";
        currentImgIndex = 1;
       
    } else {
        imgElement.src = "https://via.placeholder.com/150";
        imgElement.alt = "Placeholder Image";
        currentImgIndex = 0;
    }

})


