const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
        'api_key': API_KEY
    }
})

async function getTrendingMoviesPreview(){
    const {data} = await API('trending/movie/day?&language=es');
    
    const movies = data.results
    console.log({data, movies});

    movies.forEach(movie => {
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        const divImg = document.createElement('div');
        divImg.classList.add('movie-container');

        divImg.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(divImg)
    });
}

async function getCategoriesMoviesPreview(){
    const {data} = await API('genre/movie/list?&language=es');
    
    const categories = data.genres;
    console.log({data, categories});
    
    categories.forEach(category => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer)
    });
}

