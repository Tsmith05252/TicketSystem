const express = require("express"); // express framework 
var app = express(); 
const fs = require('fs'); // file system 
//const http = require('http')
const port = 3000;

const bodyParser = require("body-parser"); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false })); 


app.use(express.json()); //get the json
app.use(express.urlencoded({ extended: true })); // url 

// TODO: The eventual URI string for the database connection -> obtained via atlas -> not for phase i 

// Start the server 
app.get('/', (req, res) => {
    res.send('I am The Server!')
  })
  
  app.listen(port, () => {
    console.log("Listening on port:" + port)
  })

// return all of the JSON tickets
app.get('/getTickets', function(req, res) {
    fs.readFile('./tickets.json', 'utf-8', (err, jsonString) => {
        res.send(JSON.stringify(jsonString)) ; // send the data to the server 
        });
}); 


// get a single ticket for an id 
app.get('/getTicket/:id', function(req, res) {   
    fs.readFile('./tickets.json', 'utf-8', (err, jsonString) => { // read the file 
       var tickets = JSON.parse(jsonString); // parse the entire file 
       var ticket = tickets.find(x => x.id === parseInt(req.params.id)); // get the single id 
       console.log(ticket)
       res.send( JSON.stringify(ticket)); // send in the ticket information (formatted) 
        });
}); 


    // new ticket sample 
    var newTicket = {
        "id": 12345, 
        "type": "incident" , 
        "subject": "coffee cup is on fire", 
        "desc": "the coffee machine has exploded. What do I do???", 
        "priority": "very high", 
        "status": "open",  
        "recipient": " enterprise support desk" ,
        "submitter": " Spock ", 
        "tags": ["enterprise", "emergency"]
    }

// send in the data 
app.post('/api/createTicket', function(req, res) {
   
    const newTick =  {
        // post the new ticket information 
        id: req.body.id,
        type: req.body.type,  
        subject: req.body.subject,
        desc: req.body.desc, 
        priority: req.body.priority, 
        status: req.body.status, 
        recipient: req.body.recipient, 
        submitter: req.body.submitter, 
        tags: req.body.tags 
    }

    //res.json(newTick); 
    res.send(newTick); 

});    


/*
   // write to the json file 
   const jsonString = JSON.stringify(newTicket)
   fs.writeFile('./tickets.json', jsonString, err => { //write to the tickets file 
       if (err) {
           console.log('Error writing file', err) 
       } else {
           console.log('Successfully wrote file')
       }
   });

   */

   
   
   /*
   // read the file 
   fs.readFile('./tickets.json', 'utf-8', (err, jsonString) => {
    console.log(jsonString);
    });

    */