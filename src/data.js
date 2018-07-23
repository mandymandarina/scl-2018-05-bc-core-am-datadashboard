window.computeUsersStats = (users, progress, courses) => {
  for (i = 0; i < users.length; i++) {
    let userId = users[i].id;
    let userProgress = progress[userId];
    userProgressJSON = Object.entries(userProgress);
    for (j = 0; j < userProgress.length; j++)
      if (JSON.stringify(userProgress) === '{}') {
        users[i].stats = {
          percent: 0,
          exercises: { percent: 0, },
          reads: { percent: 0, },
          quizzes: {
            percent: 0,
            scoreAvg: 0,
          }
        };
      }
  }
};


window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') { // name es el campo por el que quiere ordenarlo
    // sort es una funcion que ordena los arreglos, recibe una funcion que compara un elemento con otro
    return users.sort(function(a, b) {
      if (orderDirection == 'ASC') {
        // localCompare compara 2 strings que en este caso son los nombres de las alumnas
        return a.name.localeCompare(b.name);
      } else {
        // esto mostrara el ordenamiento en orden descendente
        return a.name.localeCompare(b.name) * -1;
      }
    });
  }

  if (orderBy === 'percent') {
    return users.sort((a, b)=>{
      if (orderDirection == 'ASC') {
        return a.stats.percent - b.stats.percent;
      } else{
        return (a.stats.percent - b.stats.percent) * -1;
      }
    });
  }
};

window.filterUsers = (users, search) => {
  let newUsers = [];
  return users.filter((element) => {
    return element.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return newUsers;
};

window.processCohortData = (options) => {

};

