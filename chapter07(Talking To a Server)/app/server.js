var path    = require('path') ,
	fs      = require('fs') ,
	http    = require('http') ,

	express    = require('express'),
	bodyParser = require('body-parser'),
	logger     = require('morgan')
	favicon    = require('serve-favicon');

// ========================
// Database
// ========================

var mongoose = require('mongoose');

// set mongodb connection path and set debug with true To enable logging collection methods + arguments in console
mongoose
    .connect('mongodb://localhost/angular-resource'),
	.set('debug', true); 

var db = mongoose.connection;

db
  .on('error', console.error.bind(console, "Connection Error.")),
  .once('open', console.log.bind(console, "We have connected."));

// mongoose schemas 
var contactSchema = new mongoose.Schema({
	name   : {
		first : String,
		last  : String,
		clean : { type : String, unique : true}
	},
	email  : String,
	number : String,
	added  : Date
}); 
	
contactSchema
	// set indexes on important fields in Contact Schema Using schema.index in mongoose.js which supports MongoDB secondary indexes
	//set ordering of indexes ascending (1)  
	.index({ name : { last  : 1, clean : 1 }, email : 1 }),
	// define pre hook for Contact document before saving data
	// Make sure the Contact document has 'added' field with current date 
	// And clean field with concatenate first field and last field Before saving data
	.pre('save', function (next) {
		
		if (!this.added) {

			this.added = new Date();	
		} 

		this.name.clean = (this.name.first + '-' + this.name.last).toLowerCase();
        // must call next() method at end of callback function for save hook
        next();  
	}), 	
	// create virtual full name field under name object in Contact Document
	// schema.virtual method return VirtualType Object
	.virtual('name.full')
	  // create getter method for virtual full name field 
 	  .get(function () {

 	  	// concatonate first and last name 
 	  	return this.name.first + ' ' + this.name.last;  
 	  })
 	  // create setter method for virtual full name field 
 	  .set(function (name) {

		 // first trim name string then split it to fill first and last  fields
		 var splitArray  = name.trim().split(' ');
		 this.name.first = splitArray[0];
		 this.name.last  = splitArray[1];
		 this.name.clean = splitArray.join('-').toLowerCase();    	  	  	
 	  }); 	

// mongoose Models
var Contact = mongoose.model('Contact', contactSchema);

// ========================
// Server 
// ========================

// Setup the server 
var app = express();

app
  .set('port', process.env.PORT || 9000)
  // Use path.resolve method To Set path of views directory is out nodejs app [../app]  
  .set('views', path.resolve(__dirname, '../app'))
  // Set html as view engine 
  .set('view engine', 'html')
  // Register html callback , Express expext callback function with arguments (path, [options,] callback)
  .engine('html', function (path, options, callback) {
  	
  	 // check if typeof of options param is function 
  	 if ('function' == typeof options) {
  	 	// set callback param equal options param then set options param as empty object
  	 	callback = options;
  	 	options  = {}; 
  	 } 

  	 fs.readFile(path, 'utf8', callback);
  })
  // can replace Register html callback with next line, By using EJS template engine to ".html" files 
  //.engine('html', require('ejs').renderFile); 
  
  .use( favicon(__dirname + '/public/favicon.ico') )
  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({extended: true}) )
  .use( logger('dev') ),	
  //serve the app folder statically
  .use( express.static( path.resolve(__dirname, '../app') ) );

// ========================
// API 
// ========================
