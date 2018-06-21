
const cohort = document.getElementById('list');
const container = document.getElementById('table');
const usersJSON = 
'../data/cohorts/lim-2018-03-pre-core-pw/users.json';
  
  // Permanente
fetch(usersJSON)
  .then(response => response.json()) 
  .then(data => {
    console.log(data); // llame a la data
    renderUsers(data); // recibir info de los arreglos de objetos
  });

const renderUsers = data => { // funcion elemento del boton. cuando se aprete el boton
  // devuelva el nombre de cada una
  cohort.addEventListener('change', () => {
    const render = data.forEach(element => { // guardar en una variable  recorre todo el for each inicio a fin//() cada elemento que va a recorrer
      return container.innerHTML += `<td>${element.name}</td>`; // concatena += uno tras otro los nombres
    });
    return render;
  });
};

// Seleccion select
function getSelectValue() {
  let selectedValue = document.getElementById('list').value;
  console.log(selectedValue);
}

window.computeUsersStats = (users, progress, courses) => {
  
};

window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {

};

window.processCohortData = (options) => {

};