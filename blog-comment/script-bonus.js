	'use strict';

var MyApp = {};

// Blog App
// Use the todo app as an example of how this app should work.
// 1) Make it so that you can add a comment, use handlebars for templating. Add comment to a javascript array.
// 1a) Comment should include the users name, email address and their comment
// 2) Create list of existing comments and add them on page load to the comment section
// 3) Make it so that a comment can get deleted, also deleting it from the array
// 4) BONUS: Make the other comment section work
// 5) BONUS: Make it so that you can edit a comment

MyApp.existingComments = [
	[
		{
			cmtName: "Roger Podacter",
			cmtEmail: "rpodacter@miamidolphins.com",
			cmtText: "Dolphins are mammals and football players."
		},
		{
			cmtName: "Verbal Kint",
			cmtEmail: "devil@geocities.com",
			cmtText: "The greatest trick the devil ever pulled was convincing the world he didn't exist."
		}
	], [
		{
			cmtName: "Ray Finkle",
			cmtEmail: "lacesout@shadyacres.com",
			cmtText: "Isotoners aren't for me."
		},
		{
			cmtName: "Lois Einhorn",
			cmtEmail: "lacesout@gmail.com",
			cmtText: "Laces out, Dan!"
		}
	]
];

MyApp.compileItem = function(item){
  var source = $('#comment-template').html();
  var template =  Handlebars.compile(source);
  return template(item);
}

MyApp.addToList = function(list, name, email, text) {
  var itemObject = {
  	cmtName: name.val(),
  	cmtEmail: email.val(),
  	cmtText: text.val()
  };
  MyApp.existingComments.push(itemObject);
  var compiledItem = MyApp.compileItem(itemObject);
  list.append(compiledItem);
}

MyApp.populateList = function(list, x){
  for(var i = 0; i < MyApp.existingComments[x].length; i++) {
    var newItem = MyApp.compileItem(MyApp.existingComments[x][i]);
    list.append(newItem);
  }
}

MyApp.removeFromList = function($list, $item) {
  var itemIndex = $item.index();
  if (itemIndex > -1) {
    MyApp.existingComments.splice(itemIndex, 1);
  }
  $item.remove();
}

MyApp.editItem = function(form, name, email, text) {
  var newName = form.find(".comment_name");
  var newEmail = form.find(".comment_email");
  var newText = form.find(".comment_text");
  newName.val(name);
  newEmail.val(email);
  newText.val(text);
}

$(this).closest(".comment_form").find(".comment_name").val("Name");

$(document).ready(function(){

	var $btnSubmit = $(".btn");
	var $commentList = $(".comments");
	var $blogWrap = $("div[id^='blogpost']");

	// populate existing comments from the "MyApp.existingComments" array
	for (var i = 0; i <= $blogWrap.length - 1 ; i++) {
		var $whichBlog = i + 1;
		var $whichList = $("#blogpost" + $whichBlog).find($commentList);
		MyApp.populateList($whichList, i);
	}

	$btnSubmit.on("click", function(event){
		event.preventDefault();
		var $nameVal = $(this).siblings(".comment_name");
		var $emailVal = $(this).siblings(".comment_email");
		var $textVal = $(this).siblings(".comment_text");
		if ( $nameVal.val() === "" || $emailVal.val() === "" || $textVal.val() === "" ) {
			alert("You need to enter a name, email address, and comment.");
			return;
		}
		var $currentList = $(this).closest($blogWrap).find($commentList);
		MyApp.addToList($currentList, $nameVal, $emailVal, $textVal);
		$nameVal.val("");
		$emailVal.val("");
		$textVal.val("");
	});

	$commentList.on('click', '.delete', function(e) {
		e.preventDefault();
		var $commentItem = $(this).closest("li");
		MyApp.removeFromList($commentList, $commentItem);
	});

	$commentList.on('click', '.edit', function(e) {
		e.preventDefault();
		var $currentList = $(this).closest($blogWrap).find($commentList)
		var currentForm = $(this).closest(".comments").siblings(".comment_form");
		var editScope = $(this).closest("li");
		var editName = editScope.find("h3 strong").text();
		var editEmail = editScope.find("h3 span").text();
		var editText = editScope.find("p").text();
		var $commentItem = $(this).closest("li");
		MyApp.editItem(currentForm, editName, editEmail, editText);
		MyApp.removeFromList($currentList, $commentItem);
	});

});
