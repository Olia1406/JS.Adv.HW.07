$(document).ready(function () {
    // при кліку на кнопку search, відсилається запит по імені фільму
    document.getElementById('get-search').onclick = function () {
        // тут виділено те, що можливо треба видалити, вкінці написано чому
        // -***------------------
        $('.cross').hide();
        // -***------------------
        $('.displayMovie').hide();
        const searchText = document.getElementById('search').value;
        sendXHRRequest('GET', `http://www.omdbapi.com/?s=${searchText}&apikey=da2fafc6`)
            .then(data => showData(data))
            .then(data => sendIdRequest(data))
            .catch(error => console.log(error))
    }
    // тут описана ф-ція, що використовується при кліку вище, відсилає запит
    function sendXHRRequest(method, url) {
        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.open(method, url);
            xhr.send();
            xhr.onload = function () {
                JSON.parse(xhr.response).Response == 'True'
                    ? resolve(JSON.parse(xhr.response))
                    : reject(JSON.parse(xhr.response))
            }
        })
    }
    let imgs = document.querySelectorAll('.image');
    let names = document.querySelectorAll('.name');
    let types = document.querySelectorAll('.type');
    let years = document.querySelectorAll('.year');
    // тут ф-ція, яка відображає отримані дані в блоках і повертає об'єкт з ID-ми фільмів
    function showData(data) {
        $('.displayMovie').fadeIn(500);
        return new Promise((resolve, reject) => {
            //в об'єкт ddId зберігаються ID-ки фільмів
            let ddId = {};
            if (true) {
                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].style.backgroundImage = `url(${data.Search[i].Poster})`;
                    names[i].textContent = `${data.Search[i].Title}`
                    types[i].textContent = `${data.Search[i].Type}`
                    years[i].textContent = `${data.Search[i].Year}`
                    ddId[i] = `${data.Search[i].imdbID}`
                }
                resolve(ddId)
            }
            else reject(data);
        })
    }

    let buttsMore = document.querySelectorAll('.more');
    let modal_img = document.querySelector('.modal-img');

    // ф-ція приймає об'єкт з ID-ми фільмів і при кліку на more відсилає запит по
    //  відповідному ID і ці дані відображає в модалці
    function sendIdRequest(ddId) {
        return new Promise((resolve, reject) => {
            let detailsObj = {};
            for (let i = 0; i < 8; i++) {
                buttsMore[i].onclick = function () {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `http://www.omdbapi.com/?i=${ddId[i]}&plot=full&apikey=da2fafc6`);
                    xhr.send();
                    xhr.onload = function () {
                        let details = JSON.parse(xhr.response);
                        console.log(details);
                        $('.modal').fadeIn(500);
                        modal_img.style.backgroundImage = `url(${details.Poster})`;
                        $('.title').text(`${details.Title}`);
                        $('.decription1').text(` ${details.Rated} ${details.Genre}`);
                        $('.decription2').text(` ${details.Plot}`);
                        $('.decription3').text(` ${details.Writer}`);
                        $('.decription4').text(` ${details.Director}`);
                        $('.decription5').text(` ${details.Actors}`);
                        $('.decription6').text(` ${details.BoxOffice}`);
                        $('.decription7').text(` ${details.Awards}`);
                        $('.decription8-1').text(` ${details.Ratings[0].Source} ${details.Ratings[0].Value}`);
                        $('.decription8-2').text(` ${details.Ratings[1].Source} ${details.Ratings[1].Value}`);
                        $('.decription8-3').text(` ${details.Ratings[2].Source} ${details.Ratings[2].Value}`);
                        detailsObj[i] = details;
                    }
                    console.log(ddId[i])
                }
            }
            if (detailsObj.length != 0) {
                console.log(detailsObj);
                resolve(detailsObj)
            }
            else reject('something went wrong')
        })
    }

    let modal = document.querySelector('.modal')
    // зникає модальне вікно
    window.onclick = function (event) {
        if (event.target == modal) {
            $('.modal').fadeOut(200);
        }
    }

    //   тут з'являється і зникає хрестик в полі
    // (але там у полі вже сам з'являється такий хрестик і робить ті самі функції,
    // можливо це від браузера таке є..(??)
    // тобто тут ще один хрестик, зроблений вручну
    // можливо його не треба було робити, я виділю (якщо треба видалити)
    // -***-----------------------------------------------------------------------
    $('.enterMovie').on('input', function () {
        $('.cross').show();
    })
    $('.enterMovie').on('focus', function () {
        if ($('.enterMovie').val() == '')
            $('.cross').hide();
        else
            $('.cross').show();
    })
    $('.enterMovie').mouseover(function () {
        if ($('.enterMovie').val() == '')
            $('.cross').hide();
        else
            $('.cross').show();
    })
    $('.enterMovie').blur(function () {
        $('.cross').hide();
    })
    $('.cross').click(function () {
        $('.enterMovie').val('');
        $('.cross').hide();
    })
    // -***-----------------------------------------------------------------------





})

