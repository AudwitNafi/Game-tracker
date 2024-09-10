const gameContainer = document.querySelector('.games-container');
const gameCard = document.querySelector('.game-card');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// game_strings = [
//     'grand-theft-auto-v',
//     'the-witcher-3-wild-hunt',
//     'portal-2',
//     'counter-strike-global-offensive',
//     'tomb-raider',
//     'portal',
//     'left-4-dead-2',
//     'the-elder-scrolls-v-skyrim',
//     'red-dead-redemption-2',
//     'bioshock-infinite',
//     'life-is-strange-episode-1',
//     'borderlands-2',
//     'half-life-2',
//     'bioshock',
//     'god-of-war-2',
//     'fallout-4',
//     'limbo',
//     'payday-2',
//     'doom'
// ]

const formatString = (str)=> {
    // Convert the string to lowercase and replace spaces with hyphens
    return str.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, '-');
}

const getGameData = (data)=>{
    const {background_image, name, developers, genres, rating, rating_top, platforms, parent_platforms} = data;
    const html = `
    <div class="game-card">
        <img src="${background_image}">
        <h3>${name}</h3>
        <div class="year"> (${platforms[0].released_at.slice(0,4)}) </div>
        <span class="header">Developer</span><p> ${developers[0].name} </p>
        <span class="header">Genre</span><p> ${genres.map(genre => genre.name).join(', ')} </p>
        <span class="header">Rating</span><p> ${(((rating/rating_top)*10).toFixed(1))<10?((rating/rating_top)*10).toFixed(1):10}/10</p>
        <span class="header">Platforms</span><p> ${parent_platforms.map(item=>item.platform.name).join(', ')} </p>
    </div>
    `;
    gameContainer.insertAdjacentHTML('beforeend', html);
}



const fetchGameData = async (url)=>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        getGameData(data);
        document.getElementById('success').style.display = 'inline';
        setTimeout(function() {
            document.getElementById('success').style.display = 'none';
        }, 3000);
    }catch(err){
        document.getElementById('failure').style.display = 'inline';
        setTimeout(function() {
            document.getElementById('failure').style.display = 'none';
        }, 3000);
    }
    
}

// fetch(`https://api.rawg.io/api/games?key=3064c075496c4fc39751582992e9a15f`);
// for(x of game_strings){
//     fetchGameData(`https://api.rawg.io/api/games/${x}?key=3064c075496c4fc39751582992e9a15f`);
// }

searchButton.addEventListener('click', ()=>{
        const input = searchInput.value;
        formattedInput = formatString(input);
        fetchGameData(`https://api.rawg.io/api/games/${formattedInput}?key=3064c075496c4fc39751582992e9a15f`);
        searchInput.value = "";
    }
)

// if(document.getElementsByClassName('game-card'))
//     document.getElementsByClassName('game-card').addEventListener('click', ()=>{
//         console.log('card clicked');
    
//     // modal.classList.remove('hidden');
//     // overlay.classList.remove('hidden');
//     }
// )

// fetch(`https://api.rawg.io/api/games?key=3064c075496c4fc39751582992e9a15f`)
// .then(res=> res.json())
// .then((data)=>{
//     console.log(data);
// })

// body.insertAdjacentHTML('beforeend', html);

