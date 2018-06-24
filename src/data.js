window.computeUsersStats = (users, progress, courses) => {
  for (i = 0; i < users.length; i++) {
    let userId = users[i].id;
    let userProgress = progress[userId];

    if (JSON.stringify(userProgress) === '{}') {
      users[i] = {
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
      continue;
    }
    let readsCompleted = 0, readsTotal = 0, scoreSumQuizz = 0, scoreAvg = 0,
      quizzCompleted = 0, quizzTotal = 0, practiceTotal = 0, practiceCompleted = 0, percent = 0;

    courses.forEach(element => {
      percent = userProgress[element].percent;
      const unitsValues = Object.values(userProgress[element].units);
      unitsValues.forEach(element2 => {
        Object.values(element2.parts).forEach(element3 => {
          if (element3.type === 'read') {
            readsTotal += 1;
            if (element3.completed === 1) {
              readsCompleted += 1;
            }
          }
          if (element3.type === 'quiz') {
            quizzTotal += 1;
            if (element3.completed === 1) {
              quizzCompleted += 1;
              scoreSumQuizz += element3.score;
            }
          }
          if (element3.type === 'practice') {
            practiceTotal += 1;
            if (element3.completed === 1) {
              practiceCompleted += 1;
            }
          }
        }); // cierre de partes forEach
      });// cierre de units values forEach

      users[i] = {

        stats: {
          percent: percent,
          exercises: {
            total: practiceTotal,
            completed: practiceCompleted,
            percent: Math.round((practiceCompleted / practiceTotal) * 100),
          },

          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: Math.round((readsCompleted / readsTotal) * 100),
          },
          quizzes: {
            total: quizzTotal,
            completed: quizzCompleted,
            percent: Math.round((quizzCompleted / quizzTotal) * 100),
            scoreSum: scoreSumQuizz,
            scoreAvg: Math.round(scoreSumQuizz / quizzCompleted),
          }
        }
      };
    });
  }
  return users;
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