const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = 'https://image.tmdb.org/t/p/w500';


router.get('/', async function(req, res) {
    var qry = req.query.query;
    console.log(qry)

 
    list = [];
    names = [];
    result=[];
    api_key = "97588ddc4a26e3091152aa0c9a40de22";

    if(qry && qry.length != 0){
    search_res_url = "https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&language=en-US&query="+qry;
    search_res_data = await axios.get(search_res_url).then(function (response) {
        return response.data.results;
    });
    for(i = 0 ; i < search_res_data.length;  i++){
        if (search_res_data[i].media_type == "movie" && search_res_data[i].backdrop_path){
            temp = {};
            temp['id'] = search_res_data[i].id;
            temp['title'] = search_res_data[i].title;
            if(search_res_data[i].backdrop_path)
                temp['poster_path'] = "https://image.tmdb.org/t/p/original" + search_res_data[i].backdrop_path;
            else{
                temp['poster_path'] = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
            }
            temp['media_type'] = "movie";
            temp['year'] = search_res_data[i].release_date.split("-")[0];
            if(search_res_data[i].vote_average)
                temp["rating"] = Number((search_res_data[i].vote_average/2).toFixed(1)); //check for rating whether null..
            else
                temp["rating"] = 0;
            result.push(temp);
        }
        else if(search_res_data[i].media_type == "tv" && search_res_data[i].backdrop_path){
            temp = {};
            temp['id'] = search_res_data[i].id;
            temp['title'] = search_res_data[i].name;
            if(search_res_data[i].backdrop_path){
                temp['poster_path'] = "https://image.tmdb.org/t/p/original" + search_res_data[i].backdrop_path;
            }
            else{
                temp['poster_path'] = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg"; 
            }
            temp['year'] = search_res_data[i].first_air_date.split("-")[0];

            if(search_res_data[i].vote_average)
                temp["rating"] = Number((search_res_data[i].vote_average/2).toFixed(1)); //check for rating whether null..
            else
                temp["rating"] = 0;
            temp['media_type'] = "tv";
            result.push(temp);
        }
    }
    }
    // console.log(result);
    res.send(result);
})

module.exports = router;