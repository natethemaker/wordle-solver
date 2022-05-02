if (window.location == "https://www.nytimes.com/games/wordle/index.html"){alert(JSON.parse(window.localStorage['nyt-wordle-state']).solution)}else{console.warn('incorrect website')}
