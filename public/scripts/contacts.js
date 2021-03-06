var dynamicCards;

var firebaseConfig = {
    apiKey: "AIzaSyC6QR79tnkpGKfvhc1d_VM2Pdp8lmwVTSw",
    authDomain: "software-engineering-pro-3ba1c.firebaseapp.com",
    databaseURL: "https://software-engineering-pro-3ba1c.firebaseio.com",
    projectId: "software-engineering-pro-3ba1c",
    storageBucket: "software-engineering-pro-3ba1c.appspot.com",
    messagingSenderId: "482967068895",
    appId: "1:482967068895:web:559182a15c3ba3c1e5c96a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

//Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {constrainWidth : false});

    setupUIContacts();
});

const loggedOutComponents = document.querySelectorAll('.logged-out');
const loggedInComponents = document.querySelectorAll('.logged-in');

const setupUIContacts = (user) => {
    if(user) {
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "block");
        loggedOutComponents.forEach(item => item.style.display = 'none');
        startListeningForContacts();
    }
    else{
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "none");
        loggedOutComponents.forEach(item => item.style.display = 'block');
    }
    setDisplayAccordingToTheme();
}

function setDisplayAccordingToTheme(){
    const user = auth.currentUser;
    if(user) {
        database.ref("user themes/" + user.uid).on('value', function(snapshot){
            const theme = snapshot.val();
            console.log(theme);
            if(theme == "campfire"){
                document.body.className = "grey darken-2";
                document.getElementById("account-warning").className = "amber-text darken-3 center-align";
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo orange-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 amber-text darken-3";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    buttons[i].className  ="wave-effect waves-light btn orange darken-2 modal-trigger";
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal grey darken-2 amber-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content black-text grey darken-1";
                }
            }
            else if (theme =="coldfire"){
                document.body.className = "grey darken-2";
                document.getElementById("account-warning").className = "blue-text darken-3 center-align";
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo blue-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 blue-text darken-2";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    buttons[i].className  ="wave-effect waves-light btn blue darken-2 modal-trigger";
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal grey darken-2 blue-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content black-text grey darken-1";
                }
            }
            else{
                document.body.className = "";
                document.getElementById("account-warning").className = "center-align";
                document.getElementById("nav-wrapper").className =  "nav-wrapper amber darken-2";
                document.getElementById("logo").className = "brand-logo";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content";
                }
            }
        });
    }
}

async function startListeningForContacts(){
    console.log("Starting to listen.");
    database.ref("user contacts/" + auth.currentUser.uid).on("child_added",function (snapshot) {

        var id = snapshot.val();
        const user = {id};

        const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
        };
        
        const response = await fetch('/getuser'.options);
        const data = await response.json();
        var displayName = data.displayName;
        

        var html = "";
        html += "<li id ='contact-" + snapshot.key + "'>" +
        '<div class="card" id ="contact-card-'+snapshot.key + '">' +
        '<div class="card-content">'+
            '<span class="card-title"> <i class="material-icons">account_circle</i>' +  snapshot.val() +'</span>'+
            '<p id="user-id">User ID</p>'+
        '</div>'+
        '<div class="card-action">'+
            '<button class="wave-effect waves-light btn yellow darken-2" id ="message-button"> <i class="material-icons">message</i> Message</button>'+
        '</div>'+
    '</div>';
    });
}