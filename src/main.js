const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
        'api_key': API_KEY
    }
})

// Funciones utilitarias!

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

function createMovies(movies, container){
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        
        movieContainer.addEventListener('click', ()=>{
            location.hash = '#movie=' + movie.id;
        })

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = "";
    categories.forEach(category => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(`${category.name == 'Suspense' ? 'Suspenso' : category.name}`);

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer)
    });

}

// Llamados a la API

async function getTrendingMoviesPreview(){
    const {data} = await API('trending/movie/day?&language=es-DO');
    
    const movies = data.results
    console.log({data, movies});

    createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesMoviesPreview(){
    const {data} = await API('genre/movie/list?&language=es');
    
    const categories = data.genres;
    console.log({data, categories});

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id){
    const {data} = await API('discover/movie?&language=es', {
        params: {
            with_genres: id
        }
    });
    
    const movies = data.results;
    console.log({data, movies});

    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query){
    const {data} = await API('search/movie?&language=es', {
        params: {
            query
        }
    });
    
    const movies = data.results;
    console.log({data, movies});

    createMovies(movies, genericSection);
}

async function getTrendingMovies(){
    const {data} = await API('trending/movie/day?&language=es-DO');
    
    const movies = data.results
    console.log({data, movies});

    createMovies(movies, genericSection);
}

async function getMovieById(id){
    const {data: movie} = await API('movie/' + id + '?&language=es-DO');
    console.log(movie);
    
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%) , url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview == "" ? "Lo sentimos, descripción no disponible por el momento!" : movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

    movieDetail.scrollTo(0,0);
    
    createCategories(movie.genres, movieDetailCategoriesList);
    getMoviesRelatedById(id);
}

async function getMoviesRelatedById(id){
    const {data} = await API(`movie/${id}/similar?&language=es-DO`);
    
    const relatedMovies = data.results;
    console.log({data, relatedMovies});

    createMovies(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}