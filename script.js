// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event){

      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let faultyItems = document.getElementById('faultyItems');
      let fuelStatus = document.getElementById('fuelStatus');
      let launchStatus = document.getElementById('launchStatus');
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');

      //checking that all fields have a value
      if(pilotName.value ==="" || copilotName.value ==="" || fuelLevel.value ==="" || cargoMass.value ==="") {
         alert("All fields are required to proceed.");
         event.preventDefault();
      }
      //checking that the appropraite values were entered
      else if(!isNaN(pilotName.value) || !isNaN(copilotName.value) || isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert(`Incorrect value entered:\nPilot & Copilot must be a name.\nFuel Level & Cargo Mass must be a number.`);
         event.preventDefault();
      } else{
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
         copilotStatus.innerHTML = `Copilot ${copilotName.value} is ready for launch!`;
         event.preventDefault();
      
      if(fuelLevel.value < 10000 && cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = `There is not enough fuel for the journey.`;
         cargoStatus.innerHTML = `Cargo Mass is to much for shuttle to take off.`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
         event.preventDefault();
      } else{  
         //checking the fuel level
            if(fuelLevel.value < 10000) {
               faultyItems.style.visibility = 'visible';
               fuelStatus.innerHTML = `There is not enough fuel for the journey.`;
               launchStatus.innerHTML = `Shuttle not ready for launch`;
               launchStatus.style.color = 'red';
               event.preventDefault();
            } 
            //checking the cargo mass
            else if(cargoMass.value > 10000) {
               faultyItems.style.visibility = 'visible';
               cargoStatus.innerHTML = `Cargo Mass is to much for shuttle to take off.`;
               launchStatus.innerHTML = `Shuttle not ready for launch`;
               launchStatus.style.color = 'red';
               event.preventDefault();
            } else{
               pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
               copilotStatus.innerHTML = ` Copilot ${copilotName.value} is ready for launch!`;
               faultyItems.style.visibility = 'visible';
               launchStatus.innerHTML = `Shuttle is ready for launch!`;
               launchStatus.style.color = 'green';
               event.preventDefault();
            }
         }
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){
         const missionTarget = document.getElementById('missionTarget');
         const index = Math.floor(Math.random() * json.length - 1);
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `;
      });
   });
   event.preventDefault();

});