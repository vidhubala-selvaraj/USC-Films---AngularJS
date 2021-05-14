const express = require('express');
const router = express.Router();
const axios = require('axios');
const path_crsl = 'https://image.tmdb.org/t/p/w780';
const path = 'https://image.tmdb.org/t/p/w500';




// Popular Movies
router.get('/', async function(req, res) {

    var dict = {'carousel': [],
                'popular_movies': [], 
                'top_rated_movies': [], 
                'trending_movies': [], 
                'popular_shows': [], 
                'top_rated_shows': [], 
                'trending_shows': []}

    // Carousel
    let crsl_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=95577ade4538db35ec7653db55b4c93e&language=enUS&page=1";
    var crsl_data = await axios.get(crsl_url).then(posts => {
        return posts.data.results.slice(0, 5);
    })
    
    for (i=0; i<crsl_data.length; i++) {
        temp_dict = {'id' : crsl_data[i].id, 'backdrop_path' : path_crsl + crsl_data[i].poster_path, 'title': crsl_data[i].title}
        dict['carousel'].push(temp_dict);
    }

    
    // Popular_Movies
    let pm_url = "https://api.themoviedb.org/3/movie/popular?api_key=95577ade4538db35ec7653db55b4c93e&language=enUS&page=1";
    var pm_data = await axios.get(pm_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<pm_data.length; i++) {
        temp_dict = {'id' : pm_data[i].id, 'poster_path' : path + pm_data[i].poster_path, 'title' : pm_data[i].title}
        dict['popular_movies'].push(temp_dict);
    }

    // Top_Rated_Movies
    let tm_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=95577ade4538db35ec7653db55b4c93e&language=enUS&page=1";
    var tm_data = await axios.get(tm_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<tm_data.length; i++) {
        temp_dict = {'id' : tm_data[i].id, 'poster_path' : path + tm_data[i].poster_path, 'title' : tm_data[i].title}
        dict['top_rated_movies'].push(temp_dict);
    }

    // Trending_Movies
    let trm_url = "https://api.themoviedb.org/3/trending/movie/day?api_key=95577ade4538db35ec7653db55b4c93e";
    var trm_data = await axios.get(trm_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<trm_data.length; i++) {
        temp_dict = {'id' : trm_data[i].id, 'poster_path' : path + trm_data[i].poster_path, 'title' : trm_data[i].title}
        dict['trending_movies'].push(temp_dict);
    }

    // Popular_Shows
    let ps_url = "https://api.themoviedb.org/3/tv/popular?api_key=95577ade4538db35ec7653db55b4c93e&language=enUS&page=1";
    var ps_data = await axios.get(ps_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<ps_data.length; i++) {
        temp_dict = {'id' : ps_data[i].id, 'poster_path' : path + ps_data[i].poster_path, 'title' : ps_data[i].name}
        dict['popular_shows'].push(temp_dict);
    }

    // Top_Rated_Shows
    let ts_url = "https://api.themoviedb.org/3/tv/top_rated?api_key=95577ade4538db35ec7653db55b4c93e&language=enUS&page=1";
    var ts_data = await axios.get(ts_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<ts_data.length; i++) {
        temp_dict = {'id' : ts_data[i].id, 'poster_path' : path + ts_data[i].poster_path, 'title' : ts_data[i].name}
        dict['top_rated_shows'].push(temp_dict);
    }

    // Trending_Shows
    let trs_url = "https://api.themoviedb.org/3/trending/tv/day?api_key=95577ade4538db35ec7653db55b4c93e";
    var trs_data = await axios.get(trs_url).then(posts => {
        return posts.data.results;
    })
    
    for (i=0; i<trs_data.length; i++) {
        temp_dict = {'id' : trs_data[i].id, 'poster_path' : path + trs_data[i].poster_path, 'title' : trs_data[i].name}
        dict['trending_shows'].push(temp_dict);
    }

    res.send(dict);
});

module.exports = router;