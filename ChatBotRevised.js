//Thanks to Anon on hack.chat/?programming for cleaning up my code to work better, and look better!
//Thanks to ToastyStoemp for helping me with my  code on here!
//Thanks to M4GNV5 for help on my code, and the inspiration to make this bot
//

var stopAll = false;
var specialTest;
var pushMessageOrig = pushMessage;

pushMessage = function(args) {
	pushMessageOrig(args);
	MessageRecieved(args.text, args.nick, undefined);
}
 
//end of special function changing and start of my code
var finderBinder;
var commands = {}
var AuthedUsers = [];
function MessageRecieved( text, nick, cls ){

    CommandCheck( text, nick )
}

function CommandCheck( msg, nick ){
	if(msg === "/startthebots" || !stopAll){
    	var com = msg.split( ' ' )[0]
    	if( msg.substring(0, 1) != '/' ){
    	    return;
    	}
    	var args = msg.split( ' ' )
    	args.splice( 0, 1 )
    	var key = Object.keys(commands)
    	for (var i = 0; i < key.length; i++) {
    	    if( "/" + key[i].toLowerCase() == com.substring(0, key[i].length + 1).toLowerCase() ){
    	        console.log("Yes!")
    	        if( typeof(commands[key[i]]) == "string" ){
    	            SendMessage( commands[key[i]], nick )
    	        } else {
    	            commands[key[i]]( args, nick )
    	        }
    	        return;
    	    }
    	};
		
	}
}

function SendMessage( msg, nick ){
    if( typeof(nick) == "string" ){
        msg = msg.replace("%nick%", nick)
    }
    send( {cmd: "chat", text: msg} )
    unread -= 1
}

function AddCommand( cmd, func ){
    commands[cmd] = func
}

function GetCommands(){
    var key = Object.keys(commands)
    var str = ""
    for (var i = 0; i < key.length; i++) {
        str += key[i] + ", "
    };
    return str
}

function strJoiner( arr ){ 
   var str = ""
   for( var i = 0; i < arr.length; i++ ){
       str += arr[i] + ""
   }
   return str
}

function SendRPS( ans, nick ){
    var num = Math.round(Math.random() * 100)
    var opp;
    if( num <= 20 ){
        opp = 'rock';
    } else if ( num <= 40 ){
        opp = 'paper';
    } else if ( num <= 60 ) {
        opp = 'scissor';
    } else if ( num <= 80 ){
        opp = 'lizard';
    } else {
        opp = 'spock';
    }
    if( ans == 'rock' ){
        if( opp == 'rock' ){ SendMessage("Rock!\nTie Game!"); }
        if( opp == 'scissor' ){ SendMessage("Scissors!\n" + nick + " Wins!"); }
        if( opp == 'paper' ){ SendMessage("Paper!\n" + nick + " Loses!")}
        if( opp == 'lizard' ){ SendMessage("Lizard!\n" + nick + " Loses!")}
        if( opp == 'spock' ){ SendMessage("Spock!\n" + nick + " Wins!") }
    }
    if( ans == 'paper' ){
        if( opp == 'rock' ){ SendMessage("Rock!\n" + nick + " Wins!"); }
        if( opp == 'scissor' ){ SendMessage("Scissors!\n" + nick + " Loses!"); }
        if( opp == 'paper' ){ SendMessage("Paper!\nTie Game!")}
        if( opp == 'lizard' ){ SendMessage("Lizard!\n" + nick + " Wins!")}
        if( opp == 'spock' ){ SendMessage("Spock!\n" + nick + " Loses!") }
    }
    if( ans == 'scissor' ){
        if( opp == 'rock' ){ SendMessage("Rock!\n" + nick + " Loses!"); }
        if( opp == 'scissor' ){ SendMessage("Scissors!\nTie Game!"); }
        if( opp == 'paper' ){ SendMessage("Paper!\n" + nick + " Wins!")}
        if( opp == 'spock' ){ SendMessage("Spock!\n" + nick + " Wins!") }
        if( opp == 'lizard' ){ SendMessage("Lizard!\n" + nick + " Loses!")}

    }
    if( ans == 'lizard'){
        if( opp == 'rock' ){ SendMessage("Rock!\n" + nick + " Loses!"); }
        if( opp == 'scissor' ){ SendMessage("Scissors!\n" + nick + " Loses!"); }
        if( opp == 'paper' ){ SendMessage("Paper!\n" + nick + " Wins!")}
        if( opp == 'spock' ){ SendMessage("Spock!\n" + nick + " Wins!") }
        if( opp == 'lizard' ){ SendMessage("Lizard!\nTie Game!"); }

    }
    if( ans == 'spock'){
        if( opp == 'rock' ){ SendMessage("Rock!\n" + nick + " Wins!"); }
        if( opp == 'spock' ){ SendMessage("Spock!\nTie Game!"); }
        if( opp == 'paper' ){ SendMessage("Paper!\n" + nick + " Loses!")}
        if( opp == 'scissor' ){ SendMessage("Spock!\n" + nick + " Wins!") }
        if( opp == 'lizard' ){ SendMessage("Lizard!\n" + nick + " Loses!")}
    }
}

AddCommand( "hello", "hello %nick%!" )
AddCommand("kill", function(args, nick) {
	SendMessage('"Ok," *stabs ' + strJoiner(args) + ' in the gut*' )
	
	} )
AddCommand( "var", function(arks, nick) {
	//please note that this command does not work yet
})
AddCommand( "killme", '"Ok!" *stabs %nick% in the gut*.')
AddCommand( "creator", "MinusGix/Missing Minus(same person) created this bot!")
AddCommand( "cry", "%nick% starts crying: wah waha wahhh" )
AddCommand( "suicide", "\"Seppuku!!!\" \n *jumps off building*" )
AddCommand( "source", "https://github.com/MinusGix/Hack.Chat-ChatBot please note it may not be up to date" )
AddCommand( "laugh", "%nick% stars laughing: \"HAHAHAHAA\"" )
AddCommand( "coffee", "*Hands a cup of coffee to %nick%*" )
AddCommand( "taco", "Eww, I don't like tacos, have a burrito instead." )
AddCommand( "burrito", "\"Good Choice!\", *gives %nick% a burrito." )
AddCommand( "pizza", "Here have a slice!, *gives %nick% a slice*" )
AddCommand( "IAmVortico", function( args, nick ){
    if( nick == "vortico" ){
        SendMessage("Sure thing b0ss")
    } else {
        SendMessage("you are not vortico -_-")
    }
})
AddCommand( "stopthebots", function(isAuthed, nick){
	if(nick === "MinusGix1" || nick === "MinusGix" || nick === "ToastyStoemp"){
		SendMessage("Bots disabled");
		stopAll = true;
	}else{
		SendMessage("You aren't allowed to do that.");
	}
})
AddCommand( "startthebots", function(isAuthed, nick){
	if(nick === "MinusGix1" || nick === "MinusGix" || nick === "ToastyStoemp"){
		SendMessage("Bots enabled");
		stopAll = false;
	}else{
		SendMessage("You aren't allowed to do that.");
	}
})

AddCommand( "gaben", "GABEN IS GOD!" )
AddCommand( "bye", "Bye bye %nick%!")
AddCommand( "kittycat", "Link: http://thecatapi.com/api/images/get gives random kittehs :3")
AddCommand( "beer", "gives a beer from the cooler to %nick%")
AddCommand( "foobar", "foobar" )
AddCommand( "foo", "bar" )
AddCommand( "bar", "foo" )
AddCommand( "bacon", function( args, nick){
    if(nick == "bacon" || nick == "bacon_" || nick == "bacon__"){
        SendMessage("I hate " + nick)
    } else {
        SendMessage("Bacon, yum yum yum.")
    }
})

AddCommand( 'rock', function( args, nick ){
    SendRPS( 'rock', nick )
})
AddCommand( 'paper', function( args, nick ){
    SendRPS( 'paper', nick )
})
AddCommand( 'scissor', function( args, nick ){
    SendRPS( 'scissor', nick )
})
AddCommand( 'spock', function( args, nick ){
    SendRPS( 'spock', nick )
})

AddCommand( 'lizard', function( args, nick ){
    SendRPS( 'lizard', nick )
})

AddCommand( "commands",  "commands: \n (Add a / before them) \n" + GetCommands() ) // For this to function properly, make sure it is the last command added.
SendMessage("Initialized")