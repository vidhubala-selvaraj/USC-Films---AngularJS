const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = 'https://image.tmdb.org/t/p/w500';





// Popular Movies
router.get('/', async function(req, res) {

    console.log("IN MOdal");
    var id = req.query.id;


    // var id = req.query.id;
    dict = {};
    let cast_url = "https://api.themoviedb.org/3/person/" + id + "?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
    var cast_data = await axios.get(cast_url).then(posts => {
        return posts.data;
    })

    if (cast_data.gender == '0') {
        cast_data.gender = 'undefined'
    }
    else if (cast_data.gender == '1') {
        cast_data.gender = 'Female'
    }
    else {
        cast_data.gender = 'Male'
    }
    
    dict = {'bio' : cast_data.biography, 'as' : cast_data.also_known_as, 'birth_place' : cast_data.place_of_birth, 'known_for' : cast_data.known_for_department,
'birthday' : cast_data.birthday, 'profile_path' : path + cast_data.profile_path, 'name' : cast_data.name, 'gender' : cast_data.gender}
    res.send(dict);
});

module.exports = router;