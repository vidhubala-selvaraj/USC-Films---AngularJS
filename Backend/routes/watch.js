const express = require('express');
const rout = express.Router();
const axios = require('axios');
const path = 'https://image.tmdb.org/t/p/w500';
const avtr_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";


function timeConvert(num) {
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "hrs and " + rminutes + "mins";
}
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
var rating = "";


rout.get('/', async function(req, res) {

    var id = req.query.id;
    var media_type = req.query.media_type;
    var temp_dict = {};
    var genre = [];
    var avatar = {'av_path' : []};
    

    var dict = {'v': [],
    'd': [], 
    'r': [], 
    'c': [], 
    's': [], 
    'rd': []}

    if (media_type == 'movie') {

    // Movie_Details_Endpoint
    let md_url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
    var md_data = await axios.get(md_url).then(posts => {
        return (posts.data);
    })


    for (var j=0; j<md_data.genres.length; j++) {
                
        genre.push(md_data.genres[j]['name']);
    }

    if ((md_data.spoken_languages[0]['english_name']== null || 'undefined') || (md_data.spoken_languages[0] == null) || (md_data.spoken_languages == null)) {
        (md_data.spoken_languages[0]['english_name'] = 'undefined')
    }


        temp_dict={ 'id' : md_data.id, 
                    'title' : md_data.title, 
                    'poster_path' : path + md_data.poster_path,
                    'media_type' : "movie",
                    'media' : 'Movies',
                    'spoken_lang' : md_data['spoken_languages'][0]['english_name'],
                    'release_date' : md_data.release_date,
                    'runtime' : timeConvert(md_data.runtime),
                    'overview' : md_data.overview,
                    'vote_average' : md_data.vote_average,
                    'tagline' : md_data.tagline,
                    'gen' : genre.join(", ")}
        
        
    
        
           
    dict['d'].push(temp_dict)

        // Movie_Videos_Endpoint
        let mv_url = "https://api.themoviedb.org/3/" + media_type + "/" + id + "/videos?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var mv_data = await axios.get(mv_url).then(posts => {
            return (posts.data.results);
        })
    
        if (mv_data.length != 0) {
        for(i=0; i<mv_data.length; i++) {
            if (mv_data[i].type.includes("Trailer")) {
                temp_dict = {'site' : mv_data[i].site,
                            'type' : mv_data[i].type,
                            'name' : mv_data[i].name,
                            'key' : mv_data[i].key,
                            'video' : mv_data[i].key};

                             dict['v'].push(temp_dict); break;
                
            }
            else if (mv_data[i].type.includes("Teaser")) {
                temp_dict = {'site' : mv_data[i].site,
                             'type' : mv_data[i].type,
                             'name' : mv_data[i].name,
                             'key' : mv_data[i].key,
                             'video' : mv_data[i].key};

                              dict['v'].push(temp_dict); break;}
                
        else {
    
            temp_dict = {'key' : "tzkWB85ULJY"};
            dict['v'].push(temp_dict);
        
        }}}
        else {
            temp_dict = {'key' : "tzkWB85ULJY"};
            dict['v'].push(temp_dict);
        }


        // Movie_Reviews_Endpoint
        let mr_url = "https://api.themoviedb.org/3/movie/" + id + "/reviews?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var mr_data = await axios.get(mr_url).then(posts => {
            return (posts.data.results).slice(0, 3);
        })

        for(k=0; k<mr_data.length; k++) {


            if (mr_data[k]['author_details']['avatar_path'] != null) {

            if ((mr_data[k]['author_details']['avatar_path'].includes('https')))
                    avatar['av_path'].push(mr_data[k]['author_details']['avatar_path'].slice(1))
        
            else 
                    avatar['av_path'].push(path + mr_data[k]['author_details']['avatar_path'])
            
        } else {
            avatar['av_path'].push(avtr_path)
        }} 


    
        for(i=0; i<mr_data.length; i++) {

            var review_date = new Date(mr_data[i].created_at);

            if (mr_data[i]['author_details'].rating == null) {
                rating = 0
            }
            else {
                rating = Math.floor(mr_data[i]['author_details'].rating/2)
            }

    
            temp_dict = {'author' : mr_data[i].author, 
                        'created_at_month' : review_date.toLocaleString('default', { month: 'short' }), 
                        'created_at_day' : weekday[review_date.getDay()],
                        'created_at_year' : review_date.getFullYear(),
                        'created_at_date' : review_date.getDate(),
                        'created_at_time' : review_date.toLocaleTimeString('en-US'),
                        'content' : mr_data[i].content,
                        'url' : mr_data[i].url,
                        'rating' : rating,
                        'avatar_path' : avatar['av_path'][i],
                        }
                        // 'avatar_path': path + mr_data[i]['author_details']['avatar_path']}
    
                        dict['r'].push(temp_dict)}

        

        // Movie_Cast_Endpoint
        let mc_url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var mc_data = await axios.get(mc_url).then(posts => {
            return (posts.data.cast);
        })
    
        for(i=0;i<mc_data.length;i++) {
            if(mc_data[i].profile_path != null) {
    
            temp_dict = {'id' : mc_data[i].id, 
                        'name' : mc_data[i].name, 
                        'character' : mc_data[i].character,
                        'profile_path' : path + mc_data[i].profile_path}
                        dict['c'].push(temp_dict) } }


        // Movie_Similar_Endpoint
        let ms_url = "https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var ms_data = await axios.get(ms_url).then(posts => {
            return (posts.data.results);
        })

        if (ms_data.length != 0) {
    
        for(i=0; i<ms_data.length;i++) {
    
            temp_dict = {'id' : ms_data[i].id, 
                        'title' : ms_data[i].title, 
                        'poster_path' : path + ms_data[i].poster_path}
        dict['s'].push(temp_dict) }}

        // Movie_Recommended_Endpoint
        let mrd_url = "https://api.themoviedb.org/3/movie/" + id + "/recommendations?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var mrd_data = await axios.get(mrd_url).then(posts => {
            return (posts.data.results).slice(0, 10);
        })

        if (mrd_data.length != 0) {
    
        for(i=0;i<mrd_data.length;i++) {
    
            temp_dict = {'id' : mrd_data[i].id, 
                        'title' : mrd_data[i].title, 
                        'media_type' : 'movie',
                        'poster_path' : path + mrd_data[i].poster_path}  

        dict['rd'].push(temp_dict) }}
                        
 
    }

    

    else if (media_type == 'tv') {
        

        // TV_Videos_Endpoint
        let tvv_url = "https://api.themoviedb.org/3/tv/" + id + "/videos?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var tvv_data = await axios.get(tvv_url).then(posts => {
            return (posts.data.results);
        })

        if (tvv_data.length != 0) {
            for(i=0; i<tvv_data.length; i++) {

                if (tvv_data[i].type == 'Trailer') 
            
                {
                    temp_dict = {'site' : tvv_data[i].site,
                                'type' : tvv_data[i].type,
                                'name' : tvv_data[i].name,
                                'key' : tvv_data[i].key,
                                'video' : tvv_data[i].key}; dict['v'].push(temp_dict); break;
                    
                }
                else if (tvv_data[i].type == 'Teaser') {
                    temp_dict = {'site' : tvv_data[i].site,
                                 'type' : tvv_data[i].type,
                                 'name' : tvv_data[i].name,
                                 'key' : tvv_data[i].key,
                                 'video' : tvv_data[i].key}; dict['v'].push(temp_dict); break;}
                    
        
                }}
            else {
        
                temp_dict = {'key' : "tzkWB85ULJY"};
                dict['v'].push(temp_dict);
            
            } 
    

    
    
    
        // TV_Details_Endpoint
        let tvd_url = "https://api.themoviedb.org/3/tv/" + id + "?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
        var tvd_data = await axios.get(tvd_url).then(posts => {
            return (posts.data);
        })

        for (var j=0; j<tvd_data.genres.length; j++) {
                
            genre.push(tvd_data.genres[j]['name']);
        }

        if ((tvd_data.spoken_languages[0]['english_name']== null || 'undefined') || (tvd_data.spoken_languages[0] == null) || (tvd_data.spoken_languages == null)) {
            (tvd_data.spoken_languages[0]['english_name'] = 'undefined')
        }
    
    
            temp_dict = {'id' : tvd_data.id,
                        'media_type' : "tv",
                        'media' : 'TV Shows',
                        'poster_path': path + tvd_data.poster_path,
                        'title' : tvd_data.name, 
                        'spoken_lang' : tvd_data.spoken_languages[0]['english_name'],
                        'release_date' : tvd_data.first_air_date.split("-")[0],
                        'runtime' : tvd_data.runtime,
                        'overview' : tvd_data.overview,
                        'vote_average' : tvd_data.vote_average,
                        'tagline' : tvd_data.tagline,
                        'gen' : genre.join(", ")}
    
        dict['d'].push(temp_dict)
    
    
            // TV_Reviews_Endpoint

            let mr_url = "https://api.themoviedb.org/3/tv/"+id+"/reviews?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
            var mr_data = await axios.get(mr_url).then(posts => {
                return (posts.data.results).slice(0, 3);
            })
            console.log(mr_data);
    
            for(k=0; k<mr_data.length; k++) {
    
    
                if (mr_data[k]['author_details']['avatar_path'] != null) {
    
                if ((mr_data[k]['author_details']['avatar_path'].includes('https')))
                        avatar['av_path'].push(mr_data[k]['author_details']['avatar_path'].slice(1))
            
                else 
                        avatar['av_path'].push(path + mr_data[k]['author_details']['avatar_path'])
                
            } else {
                avatar['av_path'].push(avtr_path)
            }} 
    
    
        
            for(i=0; i<mr_data.length; i++) {
    
                var review_date = new Date(mr_data[i].created_at);
                if (mr_data[i]['author_details'].rating == null) {
                    rating = 0
                }
                else {
                    rating = Math.floor(mr_data[i]['author_details'].rating/2)
                }
    
        
                temp_dict = {'author' : mr_data[i].author, 
                            'created_at_month' : review_date.toLocaleString('default', {month: 'short'}), 
                            'created_at_year' : review_date.getFullYear(),
                            'created_at_date' : review_date.getDate(),
                            'created_at_day' : weekday[review_date.getDay()],
                            'created_at_time' : review_date.toLocaleTimeString('en-US'),
                            'content' : mr_data[i].content,
                            'url' : mr_data[i].url,
                            'rating' : rating,
                            'avatar_path' : avatar['av_path'][i],
                            }
                            // 'avatar_path': path + mr_data[i]['author_details']['avatar_path']}
        
                            dict['r'].push(temp_dict)}

            // let tvr_url = "https://api.themoviedb.org/3/" + media_type + "/" + id + "/reviews?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
            // var tvr_data = await axios.get(tvr_url).then(posts => {
            //     return (posts.data.results).slice(0, 10);
            // })

            // for(k=0; k<tvr_data.length; k++) {


            //     if (tvr_data[k]['author_details']['avatar_path'] != null) {
    
            //     if ((tvr_data[k]['author_details']['avatar_path'].includes('https')))
            //             avatar['av_path'].push(tvr_data[k]['author_details']['avatar_path'].slice(1))
            
            //     else 
            //             avatar['av_path'].push(path + tvr_data[k]['author_details']['avatar_path'])
                
            // } else {
            //     avatar['av_path'].push(avtr_path)
            // }}
        
            // for(i=0; i<tvr_data.length;i++) {
        
            //     temp_dict = {'author' : tvr_data[i].author, 
            //                 // 'created_at' : tvr_data[i].created_at, 
            //                 'created_at_month' : review_date.toLocaleString('default', { month: 'long' }), 
            //                 'created_at_year' : review_date.getFullYear(),
            //                 'created_at_date' : review_date.getDate(),
            //                 'created_at_time' : review_date.toLocaleTimeString('en-US'),
            //                 'content' : tvr_data[i].content,
            //                 'url' : tvr_data[i].url,
            //                 'rating' : tvr_data[i]['author_details'].rating,
            //                 'avatar_path' : path + tvr_data[i]['author_details'].avatar_path,
            //                  'count' : tvr_data.length}; dict['r'].push(temp_dict)}
        
    
    
            // TV_Cast_Endpoint
            let tvc_url = "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
            var tvc_data = await axios.get(tvc_url).then(posts => {
                return (posts.data.cast);
            })
        
            for(i=0;i<tvc_data.length;i++) {
                if(tvc_data[i].profile_path != null) {
        
                temp_dict = {'id' : tvc_data[i].id, 
                            'name' : tvc_data[i].name, 
                            'character' : tvc_data[i].character,
                            'profile_path' : path + tvc_data[i].profile_path}; 
                            dict['c'].push(temp_dict);}}

            // TV_Similar_Endpoint
            let tvs_url = "https://api.themoviedb.org/3/tv/" + id + "/similar?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
            var tvs_data = await axios.get(tvs_url).then(posts => {
                return (posts.data.results);
            })

            if (tvs_data.length != 0) {
        
            for(i=0;i<tvs_data.length;i++) {
        
                temp_dict = {'id' : tvs_data[i].id, 
                            'name' : tvs_data[i].name, 
                            'poster_path' : path + tvs_data[i].poster_path}; 
                            dict['s'].push(temp_dict);
                        }
                    }

            // TV_Recommended_Endpoint
            let tvrd_url = "https://api.themoviedb.org/3/tv/" + id + "/recommendations?api_key=95577ade4538db35ec7653db55b4c93e&language=en-US&page=1";
            var tvrd_data = await axios.get(tvrd_url).then(posts => {
                return (posts.data.results).slice(0, 10);
            })

            if (tvrd_data.length != 0) {
        
            for(i=0;i<tvrd_data.length;i++) {
        
                temp_dict = {'id' : tvrd_data[i].id, 
                            'title' : tvrd_data[i].name, 
                            'media_type' : 'tv',
                            'poster_path' : path + tvrd_data[i].poster_path};  
                            dict['rd'].push(temp_dict);
                        }
                    }
    

    }
    res.send(dict);
}) 




module.exports = rout;




