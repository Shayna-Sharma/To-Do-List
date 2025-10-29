const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        //create the image
        let img = document.createElement("img");
        img.src = "images/delete_icon.png"; //path to the image
        img.alt = "Delete";
        img.className = "delete-icon" //(optional) for styling purpose
        img.width = 20; 
        span.appendChild(img);

        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
/*element.addEventListener("eventType", callbackFunction);
    👉element → The HTML element you’re targeting.
    👉addEventListener -> built-in JavaScript method that tells the browser:
          “Hey, whenever a specific event happens on this element, run a function!”
    👉"eventType" → The kind of event you want to detect ("click", "input", "keydown", etc.).
    👉callbackFunction → The function that will run when the event occurs.
 */
    
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        /*e.target -> is the element that was clicked (in this case, your <li>)
         .classList — gives access to all the classes on that element.
         .toggle("checked") — means:
              -> If the element already has the class "checked", remove it.
              -> If it doesn’t have the class "checked", add it. 
         When the class is added, your CSS rule
                automatically applies — because the <li> now matches that selector!
        ✅ You didn’t write any CSS in JS — you just changed the class name. The browser instantly re-applies the relevant CSS styling because of how the CSS engine works.     */
    }
    else if(e.target.classList && e.target.classList.contains("delete-icon")){
        e.target.closest("LI").remove();
        saveData();
    }
    /* else if(e.target.className === "delete-icon"){
    //      e.target.closest("li").remove();
    } 
    we could also do the second part this way, but earlier it was not working - and .className === "delete-icon* works only if that exact string the class,
        whereas doing classList.contains("delete-icon") is more robust, ie, if the delete icon has other classes or you might click inside a child of the icon, this version is safer, as this version is more forgiving and reliable because it checks whether the clicked element includes the class, instead of matching the full className string. also, it safely ignores small differences like multiple classes. */
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

/*localStorage.setItem("data",listContainer.innerHTML) 

  🔴localStorage:-
    - This is a built-in web storage object that lets you store key–value pairs in the browser.
    - Data stays even if you refresh or close the page.
    - It only disappears if the user clears the site data or you manually remove it.

  🔴.setItem("data", something)
    - This method saves something into localStorage.
    - "data" → this is the key name (like a label or folder name).
    - something → the value you want to store.  

  🔴 listContainer.innerHTML
    - This gives you all the HTML inside your list container.
    - So you are saving that entire HTML string into localStorage.

   so simply, it Save whatever is currently inside the list (all <li>s) as a string in localStorage under the name data.” 
*/

/* localStorage.getItem("data") 
   
   🔴 .getItem("data")
            This retrieves (loads) the value you saved earlier with the key "data".

   🔴  listContainer.innerHTML = ...
            This takes that string and places it back inside your <ul> element, effectively rebuilding the list visually.

    -> So, when you reload the page:
        - JavaScript runs showTask().
        - It reads the saved list from localStorage.
        - It writes it back into your <ul>.
        - The tasks reappear exactly as before (with “checked” ones still styled).
*/
