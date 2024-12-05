async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY + '&language=es');
    const data = await res.json();
    
    const movies = data.results
    console.log({data, movies});

    movies.forEach(movie => {
        const trendingMoviesPreview = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        const divImg = document.createElement('div');
        divImg.classList.add('movie-container');

        divImg.appendChild(movieImg);
        trendingMoviesPreview.appendChild(divImg)
    });
}

async function getCategoriesMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=es');
    const data = await res.json();
    
    const categories = data.genres;
    console.log({data, categories});
    
    categories.forEach(category => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoryPreview.appendChild(categoryContainer)
    });
}

getTrendingMoviesPreview()
getCategoriesMoviesPreview()