$(function(){
$("#username_error-message").hide();
$("#day_error-message").hide();
$("#startTime_error-message").hide();
$("#endTime_error-message").hide();
$("#message_error-messagee").hide();

var error_name=false;
var error_day=false;
var error_startTime=false;
var error_endTime=false;
var error_message=false;

$("#d_doctorName").focusout(function(){
    check_name()   
});

$("#d_day").focusout(function(){
    check_day()   
});

$("#datetimepicker3").focusout(function(){
    check_startTime()   
});

$("#datetimepicker4").focusout(function(){
    check_endTime()   
});


$("#d_message").focusout(function(){
    check_message()   
});

function check_name(){
    var username=$("#d_doctorNam").val().length;
    if(username.length==0){
     $("#username_error-message").html("name can not be empty") ;
     $("#username_error-message").show();
     error_name=true;

    }
    else{
        $("#username_error-message").hide(); 
    }
}
});