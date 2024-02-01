// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFDqdnF8RcyL7JkkH6ufVspweM4wLbhK4",
    authDomain: "jsr-database.firebaseapp.com",
    databaseURL: "https://jsr-database.firebaseio.com",
    projectId: "jsr-database",
    storageBucket: "jsr-database.appspot.com",
    messagingSenderId: "40677579376"
};
firebase.initializeApp(config);

var messageAppReference = firebase.database();

$(document).ready(function() {
    $('#messageForm').submit(function(event) {
        event.preventDefault();
        var message = $('#message').val();
        $('#message').val('');
        var messageReference = messageAppReference.ref('messages');

        messageReference.push({
            message: message,
            votes: 0
        });
    });

    $("#comments").on("click", ".delete_comment", function(){
        var comment = $(this).closest("li");
        var comment_id = comment.attr("id");
        deleteMessage(comment_id);
        comment.remove();
    });

    function getMessages() {
        var messageReference = messageAppReference.ref("messages");
        messageReference.on('value', function(results) {
            results.forEach(function(message){
                console.log("messagekey: ", message.key);
                var tempLi = "<li id='" + message.getKey() + "'>" + message.val().message + "<button class='delete_comment'>delete</button></li>";
                $("#comments").append(tempLi);
            });
        });
    }

    function updateMessage(id, votes, message) {
        var messageReference = messageAppReference.ref("messages").child(id);
        messageReference.update({
            message: message,
            votes: votes
        });
    }

    function deleteMessage(id) {
        var messageReference = messageAppReference.ref("messages/").child(id);
        messageReference.remove();
    }

    getMessages();
    deleteMessage("-KpIAZvoycBFCHgY6V-m");

});