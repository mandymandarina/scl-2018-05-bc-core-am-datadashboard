window.onload = () => {
  users();
  progress();
};

var newProgressJSON = null;
var progressData = null;
var coursesData = null;

function users() {
  const cohort = document.getElementById('list');
  const container = document.getElementById('myTable');
  const usersJSON =
    '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
  var users = null;
  fetch(usersJSON)
    .then(response => response.json())
    .then(data => {
      console.log(data); // llame a la data
      users = data;
      renderUsers(data); // recibir info de los arreglos de objetos
    });

  const renderUsers = data => { // funcion elemento del boton. cuando se aprete el boton
    // devuelva el nombre de cada una
    cohort.addEventListener('change', () => {
      const users = data.forEach(element => { // guardar en una variable  recorre todo el for each inicio a fin//() cada elemento que va a recorrer
        return container.innerHTML += `<td>${element.name}</td>`; // concatena += uno tras otro los nombres
      });
      return users;
    });
  };
}

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
    progreso.addEventListener('change', () => {
      const progress = newProgressJSON.forEach(element => {
        return container2.innerHTML += `<p>${element.percent}</p>`;
       
      });
    });
  };
}



// Seleccion select
function getSelectValue() {
  let selectedValue = document.getElementById('list').value;
  console.log(selectValue);
};

function getSelectValue() {
  let selectedValue = document.getElementById('ad').value;
  console.log(selectValue);
};


function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTable');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

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
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// function getSelectValue() {
// let selectedValue = document.getElementById('list').value;
// const container = document.createElement('tabla');
// console.log(selectedValue);};


/*
const boton = document.querySelector('button');
const container = document.getElementById('root');
const usersJSON = 
'../data/cohorts/lim-2018-03-pre-core-pw/users.json';   


// permanente
fetch(usersJSON)
  .then(response => response.json()) 
  .then(data => {
    console.log(data); // llame a la data
    renderUsers(data); // recibir info de los arreglos de objetos
  });

const renderUsers = data => { // funcion elemento del boton. cuando se aprete el boton
  // devuelva el nombre de cada una
  boton.addEventListener('click', () => {
    const render = data.forEach(element => { // guardar en una variable  recorre todo el for each inicio a fin//() cada elemento que va a recorrer
      return container.innerHTML += `<p>${element.name}</p>`; // concatena += uno tras otro los nombres
    });
    return render;
  });
};
/*


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

*/
