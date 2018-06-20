window.onload = () => {
};

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


// Top
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


// Graficos 
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
