// Список задач через Promise

// Потрібно розробити функції які будуть виконуватися послідовно одна за одною за допомогою промісів.
// 1.	Зробити зарядку
// 2.	Піти в душ
// 3.	Зробити сніданок
// 4.	Піти на роботу

function morningDutys() {
    console.log('Morning dutys:');
    let promise = new Promise(function (resolve, reject) {
        if (true) {
            resolve('Make exersises')
        }
        else {
            reject('lasyness..')
        }
    })
    return promise
}

function shover(duty) {
    console.log(duty);
    let promise = new Promise(function (resolve, reject) {
        if (true) {
            resolve('Take a shower')
        }
        else {
            reject('..how come..')
        }
    })
    return promise
}

function breakfast(duty) {
    console.log(duty);
    let promise = new Promise(function (resolve, reject) {
        if (true) {
            resolve('Have a very nice and healthy breakfast')
        }
        else {
            reject('junkfood, but quickly')
        }
    })
    return promise
}

function job(duty) {
    console.log(duty);
    let promise = new Promise(function (resolve, reject) {
        if (false) {
            resolve('Go to the job')
        }
        else {
            reject('Another weekend, so quickly')
        }
    })
    return promise
}

morningDutys()
   .then(message1 => shover(message1))
   .then(message2 => breakfast(message2))
   .then(message3 => job(message3))
   .then(message4 => console.log(message4))
   .catch(error => console.log(error))

