const API_KEY = "6119cadcfb0849ff8fc145da8d1d5b33";
const url = "https://newsapi.org/v2/everything?q=";
//  json : java script object notations
window.addEventListener('load',fetchNews("india"));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}
// this is the advantage of js where with the help of $ and `` i can directly concatinate strings without + symbol
// the reason i wrote await is because the function return a promise so we have to write await at beginning and it is also a asynchronus function.
// we need the data in the form of json so we converted it and remember it is also return promise 
function bindData(articles){
    //getting the main id in which we have to create the clones
    const CardsContainer = document.getElementById("cardscontainer");
    //getting the template in which we have wrote our html code
    const newscardtemplate = document.getElementById("template-news-card");
    //lets take an example i have got the news of IPL then after that i want to know about technology so when i search for it the code starts from the top at this point iam not at all intrestead in ipl so to clear it we have to do this;
    //in simple words it clear all  the cards.
    CardsContainer.innerHTML = '';
    //applying for each loop because we get more than 100 json articles from the api fetch function 
    articles.forEach(article =>{
        //if there is no image for a good UI i am not showing that news
        if(!article.urlToImage) return;
        //now i want all the code which is wriiten in the template.
        const clone = newscardtemplate.content.cloneNode(true);
        //simple cloning all the necessart information
        clone.querySelector("#news-title").innerHTML = article.title;
        clone.querySelector("#news-desc").innerHTML = article.description;
        clone.querySelector("#news-img").src = article.urlToImage;
        // i want to show this date in the easy readable form and in the source part
        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/Jakarta",
        });
        //as i also want date in my source part
        clone.querySelector("#news-source").innerHTML = `${article.source.name} . ${date}`;
        //if we want in detail view of the news it willl open in the new windoow
        clone.firstElementChild.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
        //at last appending the clone to the main(CardsContainer).
        CardsContainer.appendChild(clone);
    })
}

//on click function 
let currselect = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currselect?.classList.remove('active');
    currselect = navItem;
    currselect.classList.add('active');
}

//getting the search text and search button id's for adding the event
const inputtext = document.getElementById("news-type");
const searchbutton = document.getElementById("Search-marr");

//this event is for clicking on search button
searchbutton.addEventListener('click', () => {
    const query = inputtext.value;
    if (!query) return;
    fetchNews(query);
    currselect?.classList.remove('active');
    currselect = null;
});

//this event is for clicking the ENTER key.
inputtext.addEventListener('keydown',(event) => {
    if (event.key == 'Enter') {
        const query = inputtext.value;
        if (!query) return;
        fetchNews(query);
        currselect?.classList.remove('active');
        currselect = null;
    }
});


