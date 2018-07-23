
let users = null;
let progress = null;
let cohorts = null; // null == false => true
// null para que sea false siempre, llaves no, corchetes si.
let usersStats = null;

// se utiliza el link de git para no usar el server 
// el link es hacia una api de ususarios que esta online
fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
  .then(usersJSON => {
    users = usersJSON;
    users = usersJSON;
    areWeFinishedYet();
    
  })
  .catch(error => {
    console.error('No pudimos obtener usuarios');
    // console.error indica un mensaje de error, indica una alerta grave
    console.error('ERROR > ' + error.stack); // error.stack muestra donde falló el codigo, imprime donde esta el error
  });
// se utiliza url relativa de gh pages.
fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
  .then(progressJSON => {
    progress = progressJSON;
    areWeFinishedYet();
  })
  .catch(error => {
    console.error('No pudimos obtener el progreso');
    console.error('ERROR > ' + error.stack);
  });

fetch('../data/cohorts.json')
  .then(response => response.json())
  .then(cohortsJSON => {
    cohorts = cohortsJSON;
    areWeFinishedYet();// se llama en todas las respuestas por que no sabemos cual llegara primero y asi nos aseguramos si se ejecutan
  })
  .catch(error => {
    console.error('No pudimos obtener el listado de cohorts');
    console.error('ERROR > ' + error.stack);
  });

function areWeFinishedYet() { // ¿hemos terminado?
  // se llama desde todas las promesas para que tome los tome en cuenta sin importar cual de ellos se ejecute primero
  // vemos si users progress y cohorts ya tienen datos en su interior sino no se ejecuta
  if (users && progress && cohorts) {
    const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw'); // busca el cohort que tiene ese id ya que este es el unico cohort que esta en los json
    const courses = Object.keys(cohort.coursesIndex);
    // guardamos el resultado de llamar a la funcion en una variable global    
    usersStats = window.computeUsersStats(users, progress, courses);// recibe users, progress y el listado de los cursos del cohort
  }
}

function onToggleSort() {
  const direction = toggleSort.innerText;
  if (direction == 'ASC') {
    toggleSort.innerText = 'DESC';
  } else {
    toggleSort.innerText = 'ASC';
  }
  // llamamos a la funcion de ordenamiento para que que ordene los usuarios
  const usersFiltered  = window.sortUsers(usersStats, 'percent', direction);
  // no se hace el getElementById por que en JS todo lo declarado en el html con un id queda como variable global :O
  table.innerHTML = '';
  for (let student of usersFiltered ) {
    table.innerHTML += `
    <tr> 
    <th scope="row">${student.name}</th>
      <td>${student.stats.percent}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      </tr>`;
  }
}

function filterStudents() {
  const search = myInput.value;
  const usersFiltered = window.filterUsers(usersStats, search);
  table.innerHTML = '';
  usersFiltered.forEach(student => {
    table.innerHTML += `
    <tr> 
    <th scope="row">${student.name}</th>
    </tr>`;
  });
}


/*
window.onload = () => {
  users();
  progress();
  courses();
  scrollFunction();
};

let newProgressJSON = null;
let usersData = null;
let progressData = null;
let cohortData = null;

function progress() {
  const progreso = document.getElementById('ad');
  const container2 = document.getElementById('myTable');
  const progressJSON =
    '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
  console.log(progressJSON);
  fetch(progressJSON)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      progressData = data;
      newProgressJSON = Object.entries(progressData);
      renderProgress(data);
    });

  const renderProgress = data => {
    progreso.addEventListener('change', renderProgressTable.bind(this, data));
  };
}

function courses() {
  const cursos = document.getElementById('ad');
  const container3 = document.getElementById('myTable');
  const cohortJSON =
    '../data/cohorts.json';
  fetch(cohortJSON)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      cohortData = data;
      renderCohort(data);
    });

  const renderCohort = data => {
    cursos.addEventListener('change', () => {
      const cohortData = data.forEach(element => {
        return container3.innerHTML += `<p>${element}</p>`;
      });
    });
  };
}


function renderUserTable(data) {
  const container = document.getElementById('myTable');
  container.innerHTML = '';
  const userStats = window.comp;
  const usersData = data.forEach(element => {
    return container.innerHTML += '<tr>' +
      '<td>' + '<td>' + '</td>' +
      '<td>' + element.name + '</td>' +
      '<td>' + +'</td>' + '</td>' + 
      '<td>' + +'</td>' + '<td>' +
      '<td>' + +'</td>' + '<td>' +
      '<td>' + +'</td>' + '<td>' +
      '<td>' + +'</td>' +  '<td>' +
    
      '</tr>';
  });
}

function users() {
  const cohort = document.getElementById('list');
  const container = document.getElementById('myTable');
  const usersJSON =
    '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
  fetch(usersJSON)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      usersData = data;
      renderUsers(data);
    });

  const renderUsers = data => {
    cohort.addEventListener('change', renderUserTable.bind(this, data));
  };
}


function renderProgressTable(data) {
  const container = document.getElementById('myTable');
  container.innerHTML = '';
  return container.innerHTML += renderProgress;
}

function start() {
  if (users && progress && courses) {
    processed = computeUsersStats(users, progress, courses);
  }
}

selectChange = (user, progress, cohorts) => {
  let findStudents = '';
  let orderDirection = '';

  document.getElementById('list').addEventListener('change', () => {
    let studentsCohort = document.getElementById('list').value;
    findStudents = newProgressJSON.find(item => item[0] === studentsCohort);
    console.log(findStudents);
  });
};
// Seleccion select
function getSelectValue() {
  let selectedValue = document.getElementById('list').value;
  console.log(selectValue);
};

function getSelectValue() {
  let selectedValue = document.getElementById('ad').value;
  console.log(selectValue);
};

function filterStudents() {
  const searchText = myInput.value;
  const usersFiltered = window.filterUsers(usersData, searchText);
  const table = document.getElementById('myTable');

  renderUserTable(usersFiltered);
}


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('myBtn').style.display = 'block';
  } else {
    document.getElementById('myBtn').style.display = 'none';
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Graficos //

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['String', 'Porcentaje', { role: 'style' }],
    ['Completitud Total', 74, '#FFE521'],
    ['Completitud Ejercicios', 59, '#56F89A'],
    ['Completitud Lecturas', 74, '#47EADA'],
    ['Completitud Quizzes', 68, 'color: #FF009E;']
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
    {
      calc: 'stringify',
      sourceColumn: 1,
      type: 'string',
      role: 'annotation'
    },
    2]);

  var options = {

    width: 600,
    height: 400,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
  chart.draw(view, options);
}

*/