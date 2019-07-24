const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    Firebase = require('firebase');
    
    
    const firebaseConfig = {
        apiKey: "AIzaSyBuiLs_lWTElpCqhPm_kcC02alEhcsWltw",
        authDomain: "testchat-99354.firebaseapp.com",
        databaseURL: "https://testchat-99354.firebaseio.com",
        projectId: "testchat-99354",
        storageBucket: "testchat-99354.appspot.com",
        messagingSenderId: "656782596205",
        appId: "1:656782596205:web:b1e32b92d31ac84c"
      };
      Firebase.initializeApp(firebaseConfig);
      
    const ChatRoute = require('./routes/chat.route');
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/chat', ChatRoute);
    const port = process.env.PORT || 4000;
    

   app.listen(port);