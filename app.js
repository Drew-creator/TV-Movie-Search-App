const form = document.querySelector('#searchForm');
// const div = document.querySelector('#card');
const h1 = document.querySelector('#showName');
const summaryParagraph = document.querySelector('#summary');
const showTitle = document.querySelector('#title');
const officialSite = document.querySelector('#site');
const status = document.querySelector('#status');
const score = document.querySelector('#score');
const type = document.querySelector('#type');
const language = document.querySelector('#language');
const generes = document.querySelector('#generes');
const show = document.querySelector('#show')

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        const config = { params: {q: searchTerm} }
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        console.log(res.data)
        searchResults(res.data);
        form.elements.query.value = "";
    } catch (e) {
        console.log("Error:", e)
    }
    
})

const searchResults = (shows) => {
    clearSearchResults();
    for(let result of shows) {
        if(result.show.image) {
            const card = document.createElement('div');
            const anchor = document.createElement('anchor');
            document.body.insertBefore(card, show);
            card.id = "card";
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            anchor.append(img);

            card.append(anchor);

            //img.style.width = "100%"

            anchor.addEventListener('click', () => {
                showTitle.innerHTML = result.show.name;
                summaryParagraph.innerHTML = result.show.summary;
                officialSite.innerHTML = `<b>Official Site:</b> ${result.show.officialSite}`;
                status.innerHTML =`<b>Status:</b> ${result.show.status}`;
                score.innerHTML = `<b>Score:</b> ${result.score}`;
                type.innerHTML = `<b>Type:</b> ${result.show.type}`;
                language.innerHTML = `<b>Language:</b> ${result.show.language}`;
            })          
        } 
    }
}

function clearSearchResults() {
    //card.innerHTML = "";
    showTitle.innerHTML = "";
    summaryParagraph.innerHTML = "";
    officialSite.innerHTML = "";
    status.innerHTML = "";
    score.innerHTML = "";
    type.innerHTML = "";
    language.innerHTML = "";
}

