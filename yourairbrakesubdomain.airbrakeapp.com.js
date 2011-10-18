// NOTE: You need dotjs installed to use this: https://github.com/defunkt/dotjs
//
// You must name this file with your airbrakeapp subdomain prepended to the filename.
// Example: So myairbrakesubdomain.airbrakeapp.com.js

var login = "<GITHUB USER NAME>";
var token = "<GITHUB TOKEN>";
var REPO_USER = "<GITHUB REPO USER>";
var REPO_NAME = "<GITHUB REPO NAME>";

var title = $("#notice_heading h2").text();
var link  = document.location.href;

var button = $('<a id="lnk-github-issue" href="#" style="font-size:11px;font-weight:normal;margin-left:13px;padding-top:8px;">Create Github Issue</a>');
button.appendTo("#notice_heading h2");
$("#lnk-github-issue").live("click",function(){$("#issue-container").show(); return false;});
$("#lnk-cancel").live("click",function(){$("#issue-container").hide();return false;});

var form_container = $('<div id="issue-container" style="z-index:99999;position:absolute;margin-left:200px;height:330px;width:500px;background-color:#ffffff;border:10px solid #cccccc;padding:10px;display:none;"></div>');
form_container.appendTo("#resolved_toggle");
var f = $('<p><strong>Issue Title</strong><br /><input type="text" id="title" value="'+title+'" size="25" /></p><p><strong>Github Issue Description</strong><br /><textarea id="body" rows="5" cols="20">'+link+'</textarea></p><p><button id="create-github-issue">Send to Github Issues</button>&nbsp;<a id="lnk-cancel" href="#">Cancel</a></p>');
f.appendTo("#issue-container");


$("#create-github-issue").click(function() {
  var data = {"token": token, "login": login, "title": $("#title").val(), "body": $("#body").val()}

  // prevent accidental double submission
  button.attr("disabled", "disabled")

  $.ajax({
    method: "POST",
    data: data,
    url: "https://github.com/api/v2/json/issues/open/"+REPO_USER+"/"+REPO_NAME,
    success: function() {
      $("#lnk-github-issue").html("Issue Created.")
	  $("#issue-container").hide();
	  
      var issueUrl = data['issue']['html_url']
      button.after('<a href="'+issueUrl+'" target="_blank">Go to Issue</a>')
    }
  });
});
