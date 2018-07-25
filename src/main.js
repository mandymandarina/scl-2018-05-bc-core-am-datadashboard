let users = null;
let progress = null;
let cohorts = null; 
let usersStats = null;


fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
  .then(usersJSON => {
    users = usersJSON;
    users = usersJSON;
    areWeFinishedYet();
    
  })
  .catch(error => {
    console.error('No pudimos obtener usuarios');
  
    console.error('ERROR > ' + error.stack); 
  });

 

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
    areWeFinishedYet();
  })
  .catch(error => {
    console.error('No pudimos obtener el listado de cohorts');
    console.error('ERROR > ' + error.stack);
  });

function areWeFinishedYet() { 
  if (users && progress && cohorts) {
    const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw'); 
    const courses = Object.keys(cohort.coursesIndex); 
    usersStats = window.computeUsersStats(users, progress, courses);
  }
}

function onToggleSort() {
  const direction = toggleSort.innerText;
  if (direction == 'ASC') {
    toggleSort.innerText = 'DESC';
  } else {
    toggleSort.innerText = 'ASC';
  }
  
  const usersFiltered  = window.sortUsers(usersStats, 'percent', direction);
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

function filterData() {
  const search = myInput.value;
  const usersFiltered = window.filterUsers(usersStats, search);
  table.innerHTML = '';
  usersFiltered.forEach(student => {
    table.innerHTML += `
    <tr> 
    <th scope="row">${student.name}</th>
    <td>${student.stats.percent}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      </tr>`;
  });
}
// Función Select
function getSelectValue() {
  let selectedValue = document.getElementById('list').value;
  console.log(selectedValue);
  const search = myInput.value;
  const usersFiltered = window.filterUsers(usersStats, search);
  table.innerHTML = '';
  usersFiltered.forEach(student => {
    table.innerHTML += `
    <tr> 
    <th scope="row">${student.name}</th>
    <td>${student.stats.percent}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
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
function renderUserTable(data) {
  const container = document.getElementById('table');
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
  const container = document.getElementById('table');
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
function filterStudents() {
  const searchText = myInput.value;
  const usersFiltered = window.filterUsers(usersData, searchText);
  const table = document.getElementById('table');
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