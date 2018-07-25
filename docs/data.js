window.computeUsersStats = (
  users, 
  progress, 
  courses 
)=> {
  for (let i = 0; i < users.length; i++) {
    let userId = users[i].id;
    let userProgress = progress[userId];
    if (JSON.stringify(userProgress) === '{}') { // Esto permite que si un usuario no ha completado nada, se le agreguen datos en 0. Asumo que esto evita que salga undefined en algunas personas. 
      users[i].stats = {
        percent: 0,
        exercises: { percent: 0, },
        reads: { percent: 0, },
        quizzes: {
          percent: 0,
          scoreAvg: 0,
        }
      };
    } else {
      let percentGral = 0;
      let lectures = 0;
      let lecturesCompleted = 0;
      let lecturesPercent = 0;
      let quizzes = 0;
      let quizzesCompleted = 0;
      let quizzesPercent = 0;
      let exercises = 0;
      let exercisesCompleted = 0;
      let exercisesPercent = 0;
      let scoreSum = 0;
      let scoreAvg = 0;

    
      for (let i in userProgress) { 
        let element = userProgress[i];
        if (courses.indexOf(i) < 0) {
          continue;
        }
        // calculamos aca el porcentaje general
        percentGral += element.percent / Object.keys(userProgress).length;
        for (let unit of Object.values(element.units)) { // aca itera por cada unidad de cada curso
          for (let part of Object.values(unit.parts)) { 
            if (part.length === 0) {
              quizzes = 0;
              exercises = 0;
              lectures = 0;
              quizzesPercent = 0;
              exercisesPercent = 0;
              lecturesPercent = 0;
            }
            // acá verifica si tuvo lecturas
            if (part.type === 'read') {
              lectures++;
            }
            if (part.type === 'read' && part.completed === 1) {// si la part.type === reads y completed es =1 entonces se incrementa el contador de lecturas completadas, ya que ademas de tener lecturas deben estar completadas, para entender mejor las parts ver el json de progress
              lecturesCompleted++;
            }
            
            lecturesPercent = Math.round((lecturesCompleted * 100) / lectures);
            // si la part.type es un quizz aumenta el contador de quizzes        
            if (part.type === 'quiz') { // type es la llave que hay en el objeto que estamos recorriendo
              quizzes++;
            }
            if (part.type === 'quiz' && part.completed === 1) {
              quizzesCompleted++;
              // saca la suma general para luego sacar el promedio
              scoreSum += part.score;
            }
            quizzesPercent = Math.round((quizzesCompleted * 100 * 10 / quizzes)) / 10;// truco para sacar 1 decimal
                 
            if (part.type === 'practice') {
              exercises++;
            }
            if (part.type === 'practice' && part.completed === 1) {
              exercisesCompleted++;
            }
            exercisesPercent = Math.round((exercisesCompleted * 100 * 10) / (exercises || 1)) / 10; // aca le indicamos que si exercises=0, entonces que lo divida entre 1 para que no de un valor NaN 
          } 
        } 
      }
      scoreAvg = scoreSum / quizzes;

      users[i].stats = {
        percent: percentGral,
        reads: {
          percent: lecturesPercent,
          total: lectures,
          completed: lecturesCompleted
        },
        exercises: {
          percent: exercisesPercent,
          total: exercises,
          completed: exercisesCompleted
        },
        quizzes: {
          percent: quizzesPercent,
          total: quizzes,
          completed: quizzesCompleted,
          scoreAvg: scoreAvg,
          scoreSum: scoreSum
        }
      };
    }
  }
  
  return users;
};

window.sortUsers = (users/* array*/, orderBy/* string*/, orderDirection/* string*/) => { // esta funcion ordena por orden alfabetico a las alumnas
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
  if (search) {
    if (users) {
      search = search.toLowerCase();
      return users.filter(user => user &&
         user.name &&
        user.name.toLowerCase().indexOf(search) >= 0);
    }
  }
  return users;
};

/*
window.computeUsersStats = (users, progress, courses) => {
  users, // Arreglo de usuarios directo desde users.json
  progress, // Objeto de progreso directo desde progress.json
  courses; // Arreglo de índices de cursos desde el cohort seleccionado) => {
  for (let i = 0; i < users.length; i++) {
    let userId = users[i].id;
    
      Puedo acceder de esta forma al progreso del usuario
      gracias a que la llave de cada progreso es el id
      del usuario
    
    let userProgress = progress[userId];
    if (JSON.stringify(userProgress) === '{}') { // Esto permite que si un usuario no ha completado nada, se le agreguen datos en 0. Asumo que esto evita que salga undefined en algunas personas. 
      users[i].stats = {
        percent: 0,
        exercises: { percent: 0, },
        reads: { percent: 0, },
        quizzes: {
          percent: 0,
          scoreAvg: 0,
        }
      };
    } else {
      // inicializa en cero para luego hacer un contador.
      // for in recorre las llaves y el for of recorre el value.
      let percentGral = 0;
      let lectures = 0;
      let lecturesCompleted = 0;
      let lecturesPercent = 0;
      let quizzes = 0;
      let quizzesCompleted = 0;
      let quizzesPercent = 0;
      let exercises = 0;
      let exercisesCompleted = 0;
      let exercisesPercent = 0;
      let scoreSum = 0;
      let scoreAvg = 0;
      // Esto irá recorriendo cada id de curso
      for (let i in userProgress) { // i en este caso son los cursos que hay dentro del objeto userProgress
        let element = userProgress[i];
        if (courses.indexOf(i) < 0) {
          continue;
        }
        // calculamos aca el porcentaje general
        percentGral += element.percent / Object.keys(userProgress).length;
        for (let unit of Object.values(element.units)) { // aca itera por cada unidad de cada curso
          // el object.value depende del js, a veces no lo necesita
          // for of nunca va a fallar, no da error en el i de indice.
          // con for of recorre por todas las propiedades del objeto y no por los keys
          for (let part of Object.values(unit.parts)) { // aca recorremos cada parte de cada unidad de cada curso, las partes pueden ser lecturas, quizes, exercise, etc
            // en este caso si la part.length = 0 quiere decir que NO tiene datos en su interior 
            // asi que para que los contadores no se aumenten, se les da el valor de cero y se define aqui para asegurar que siempre los porcentajes den al menos cero
            if (part.length === 0) {
              quizzes = 0;
              exercises = 0;
              lectures = 0;
              quizzesPercent = 0;
              exercisesPercent = 0;
              lecturesPercent = 0;
            }
            // acá verifica si tuvo lecturas
            if (part.type === 'read') {
              lectures++;
            }
            // acá verifica si las completo.
            // consejo de caro, colocar el tipo para no obtener porcentajes raros.
            // esto es para un curso o tema en particular.
            if (part.type === 'read' && part.completed === 1) {// si la part.type === reads y completed es =1 entonces se incrementa el contador de lecturas completadas, ya que ademas de tener lecturas deben estar completadas, para entender mejor las parts ver el json de progress
              lecturesCompleted++;
            }
            // en esta parte se calcula el resultado del porcentaje de lecturas
            // math.round para redondear resultado
            // el math.round tambien sirve para que no de decimales raros
            //  sacar el % fuera del for para evitar que recalcule
            // para redondear con 2 decimales multiplicas *100, redondeas y dividimos por 100
            lecturesPercent = Math.round((lecturesCompleted * 100) / lectures);
            // si la part.type es un quizz aumenta el contador de quizzes        
            if (part.type === 'quiz') { // type es la llave que hay en el objeto que estamos recorriendo
              quizzes++;
            }
            if (part.type === 'quiz' && part.completed === 1) {
              quizzesCompleted++;
              // saca la suma general para luego sacar el promedio
              scoreSum += part.score;
            }
            quizzesPercent = Math.round((quizzesCompleted * 100 * 10 / quizzes)) / 10;// truco para sacar 1 decimal
            // si la part.type es una practice aumenta el contador de exercises             
            if (part.type === 'practice') {
              exercises++;
            }
            if (part.type === 'practice' && part.completed === 1) {
              exercisesCompleted++;
            }
            exercisesPercent = Math.round((exercisesCompleted * 100 * 10) / (exercises || 1)) / 10; // aca le indicamos que si exercises=0, entonces que lo divida entre 1 para que no de un valor NaN 
          } // aca termina el for que recorre las parts
        } // aca termina el for que recorre las unidades
      }// aca termina el for que recorre los cursos
      // saca promedio
      scoreAvg = scoreSum / quizzes;
      users[i].stats = {
        percent: percentGral,
        reads: {
          percent: lecturesPercent,
          total: lectures,
          completed: lecturesCompleted
        },
        exercises: {
          percent: exercisesPercent,
          total: exercises,
          completed: exercisesCompleted
        },
        quizzes: {
          percent: quizzesPercent,
          total: quizzes,
          completed: quizzesCompleted,
          scoreAvg: scoreAvg,
          scoreSum: scoreSum
        }
      };
    }
  }
  // Deberíamos retornar los resultados!
  return users;
};
window.sortUsers = (users, orderBy, orderDirection) => {
  
};
window.filterUsers = (users, search) => {
  var newUsers = [];
  return users.filter((element) => { // devuelve todos los caracteres alfabéticos de una cadena a caracteres en minúscula.
    return element.name.toLowerCase().indexOf(search.toLowerCase()) >= 0; // devuelve el comienzo de la cadena de strings
  });
  return newUsers;
};
window.processCohortData = (options) => {
};
*/
