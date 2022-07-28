// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
        const missionT = document.getElementById("missionTarget");
       missionT.innerHTML =  `     
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
                `;

}

function validateInput(testInput) {
    let response = "";
        if( testInput !="" && isNaN(testInput)) {
        
            return  "Not a Number"; 
        } else if(testInput != "" && !isNaN(testInput)){
        
            return "Is a Number";
        } else {
             return "Empty";
        }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel,event) {

    const faultyItemsList= document.getElementById("faultyItems");
    const faultyItemStatus = document.getElementById("faultyItems");
    const pilotS = document.getElementById("pilotStatus");
    const copilotS = document.getElementById("copilotStatus");
    const fuelStatusT = document.getElementById("fuelStatus");
    const cargoS = document.getElementById("cargoStatus");
    const faultyItemsHeader = document.getElementById("launchStatus");
   

   if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty"|| validateInput(cargoLevel) === "Empty"){
            window.alert("all fields are required!");
            faultyItemsHeader.innerHTML = "Awaiting Information Before Launch";
            faultyItemsHeader.style.color = "black";
            faultyItemStatus.style.visibility = "hidden";
            event.preventDefault();

   } else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
            window.alert("Please ensure to enter a valid input !!");
            faultyItemsHeader.innerHTML = "Awaiting Information Before Launch";
            faultyItemsHeader.style.color = "black";
            faultyItemStatus.style.visibility = "hidden";
            event.preventDefault();

   }else if(fuelLevel < 10000 && cargoLevel > 10000){
            pilotS.innerHTML = `${pilot} is ready for launch`;
            copilotS.innerHTML = `${copilot} is ready for launch`;
            faultyItemsHeader.innerHTML = "Shuttle not ready for launch";
            faultyItemsHeader.style.color = "red";
            faultyItemStatus.style.visibility = "visible";
            fuelStatusT.innerHTML = "Not enough fuel for journey";
            cargoS.innerHTML = "There is too much mass for the shuttle to take off";
            event.preventDefault();

    }else if(fuelLevel < 10000 && cargoLevel < 10000){
            pilotS.innerHTML = `${pilot} is ready for launch`;
            copilotS.innerHTML = `${copilot} is ready for launch`;
            faultyItemsHeader.innerHTML = "Shuttle not ready for launch";
            faultyItemsHeader.style.color = "red";
            faultyItemStatus.style.visibility = "visible";
            fuelStatusT.innerHTML = "Not enough fuel for journey";
            cargoS.innerHTML = "Cargo mass low enough for launch";
           event.preventDefault();

    }else if(fuelLevel > 10000 && cargoLevel > 10000){
            pilotS.innerHTML = `${pilot} is ready for launch`;
            copilotS.innerHTML = `${copilot} is ready for launch`;
            faultyItemsHeader.innerHTML = "Shuttle not ready for launch";
            faultyItemStatus.style.visibility = "visible";
            faultyItemsHeader.style.color = "red";
            fuelStatusT.innerHTML = "Fuel level high enough for launch";
            cargoLevel.innerHTML = " There is too much mass for the shuttle to take off"
            event.preventDefault();

    } else {
        pilotS.innerHTML = `${pilot} is ready for launch`;
        copilotS.innerHTML = `${copilot} is ready for launch`;
        cargoS.innerHTML = "Cargo mass low enough for launch";
        fuelStatusT.innerHTML = "Fuel level high enough for launch";
        faultyItemsHeader.innerHTML = "Shuttle is ready for launch";
        faultyItemStatus.style.visibility = "visible";
        faultyItemsHeader.style.color = "green";
        event.preventDefault();
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         console.log(planetsReturned);
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(planets.length * Math.random())];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
