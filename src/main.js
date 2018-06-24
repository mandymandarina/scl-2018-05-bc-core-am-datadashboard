window.onload = () => { 
// Funciones globales
  users(); 
  progress();
  cohorts();
};

var newProgressJSON = null;
var usersData = null;
var progressData = null;
var cohortData = null; 

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
  const container = document.getElementById('myTable');
  container.innerHTML = ''; // Limpia los datos
  const usersData = data.forEach(element => { 
    return container.innerHTML += `<td>${element.name}</td>`;
  });
}

// Usuarios
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
    

    const renderseUsers = (renderUsers, renderProgress) => {
      let rankingNumber = 0;
      btn.addEventListener('click', () => {
        const render = renderUsers.forEach(user => {
          rankingNumber ++;
          let userProgress = renderProgress[renderUsers.id]; // aqui se hace el match de users.json con progress.json
          // Cuando se cumpla la condicion entragara el valor correspondiente, si la condicion es falsa, entregara 'sin   info'
          let percent = 'info';
          if (userProgress.intro) {
            percent = userProgress.intro.percent;
          }
          return renderProgressTable.innerHTML += '<tr>';
        });
        return render;
      });
    };
  };
}

// Progreso

// Cohort users
function cohorts() {
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
        return container3.innerHTML += `<p>${element.cohort}</p>`;
      });
    });
  };
}


// FuncionesSelect
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
// termino select

// Progreso 
function renderProgressTable(renderData, progressData) {
  let rankingNumber = 0;
  const container = document.getElementById('myTable');
  container.innerHTML = ''; 
  const render = renderData.forEach(renderUsers => {
    rankingNumber ++;
    let userProgress = progressData[renderData.id];
    let percent = 'Sin info';
    if (userProgress.intro) {
      percent = userProgress.intro.percent;
    } return renderData;
  });
}


// Scroll function (top)
window.onscroll = function() {
  scrollFunction()
  ;
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('myBtn').style.display = 'block';
  } else {
    document.getElementById('myBtn').style.display = 'none';
  }
}

// Cuando el usuario hace clic en el botón, desplácese hasta la parte superior del documento
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Graficos //
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Sprint', 'Porcentaje', { role: 'style' }],
    ['Excercises', 8.94, '#b87333'],
    ['Reads', 10.49, 'silver'],
    ['Quizzes', 19.30, 'gold'],

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
    title: 'Cursos del Cohort',
    width: 400,
    height: 300,
    bar: { groupWidth: '85%' },
    legend: { position: 'none' },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
  chart.draw(view, options);
}
