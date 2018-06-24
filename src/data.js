window.computeUsersStats = (users, progress, courses) => {
  for (i = 0; i < users.length; i++) {
    let userId = users[i].id;
    let userProgress = progress[userId];
    userProgressJSON = Object.entries(userProgress);
    for (j = 0; j < userProgress.length; j++)
      if (JSON.stringify(userProgress[j]) === '{}') {
        users[i] = {
          ...users[i],            
          stats: {
            percent: 0,
            exercises: { percent: 0, },
            reads: { percent: 0, },
            quizzes: {
              percent: 0,
              scoreAvg: 0,

            }
          }
        };
      }
  }
};


window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {
  var newUsers = [];
  return users.filter((element) => {    
    return element.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return newUsers;
};

window.processCohortData = (options) => {

};

