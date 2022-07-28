// Write your JavaScript code here!

//const { addDestinationInfo } = require("./scriptHelper");

//const { pickPlanet } = require("./scriptHelper");

//const { myFetch } = require("./scriptHelper");

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let selectedPlanet = pickPlanet(listedPlanets);
       console.log(selectedPlanet.image);
       addDestinationInfo(document,selectedPlanet.name, selectedPlanet.distance, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
     
       let form = document.querySelector("form");
       form.addEventListener("submit",function(event){
            let pilotName = document.querySelector("input[name=pilotName]");
            let copilotName = document.querySelector("input[name=copilotName]");
            let fuelLevel = document.querySelector("input[name=fuelLevel]");
            let cargoMass = document.querySelector("input[name=cargoMass]");

            console.log(pilotName.value + " " + copilotName.value + " " + fuelLevel.value + " " + cargoMass.value );
            formSubmission(document,"list",pilotName.value,copilotName.value,fuelLevel.value,cargoMass.value,event);

       });
      
   })
   
});
