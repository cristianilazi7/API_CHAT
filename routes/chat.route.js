const express = require('express');

const searchYoutube = require('youtube-api-v3-search');
const ChatRoutes = express.Router();
Firebase = require('firebase');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCPc7PymTnS6N87RIwjwiAGDaIPc1oiA5w');


// Defined get data(index or listing) route
ChatRoutes.route('/').get(function (req, res) {

    var options = {
        q:'un amor eterno',
        part:'snippet',
        type:'video',
        videoEmbeddable:true
    }
    console.log("HTTP Get Request");
  /* searchYoutube("AIzaSyCPc7PymTnS6N87RIwjwiAGDaIPc1oiA5w",options,function(result){
        console.log(result)
    })*/
    

	var MessagesReference = Firebase.database().ref("/TestMessages/");
   
	//Attach an asynchronous callback to read the data
	MessagesReference.on("value", 
			  function(snapshot) {
					//console.log(snapshot.val());
					res.json(snapshot.val());
					MessagesReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
     
  });

  ChatRoutes.route('/youtube/:song_name').get(function(req,res){
    console.log(req.params.song_name.trim())
    youtube.searchVideos(req.params.song_name.trim(), 4)
    .then(results => {
        
        console.log(`The video's title is ${results[0]}`);
        var id_video = 'https://www.youtube.com/embed/'+results[0].url.split('=')[1]
        res.status(200).json({'result': id_video,'status':200});

    })
    .catch(error =>{ res.send("Data could not be." + error)});

  });

  ChatRoutes.route('/add/message').put(function(req,res){
    console.log(req.body)
    console.log("HTTP Put Request");
    var MessagesReference = Firebase.database().ref('/TestMessages');
    
    newMessage = {
        id: req.body.id, 
        text:req.body.text,
        date: req.body.date,
        name: req.body.name,
        url: req.body.url,
        title:req.body.song_name,
    }
   

        var swt = false;
    //var messsagerefe = Firebase.collection('ChatRoom').add(newMessage);
    var newRef = MessagesReference.push(newMessage,
                            function(error){
                                if(error){
                                    res.send("Data could not be saved." + error);
                                }else{
                                    res.status(200).json({'result': "Data saved successfully.",'status':200});
                                }
                            });
    
  
  });

  ChatRoutes.route('/add/user').put(function(req,res){
    console.log(req.body)
    //req.body.song_name.trim()
    

    console.log("HTTP Put Request");
    var UsersReference = Firebase.database().ref('/Users/'+req.body.name);
   
   
    
    newUser = {        
        name: req.body.name
    }
    var swt = false;
    

        newRef = UsersReference.set(newUser,
            function(error){
                if(error){
                   console.log("error",error)
                  // swt = true
                   res.status(422).json({'result': error,'status':422});
                }else{
                    console.log("successfully");
                    res.status(200).json({'result': "Data saved successfully.",'status':200}); 

                }
            });
          
   
  
  });


  module.exports = ChatRoutes;