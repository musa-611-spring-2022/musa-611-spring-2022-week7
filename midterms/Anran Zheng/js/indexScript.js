/* CSS magic only */

function sendVal(val) {
    var myUrl="./application.html"+"?"+"val="+val;
    window.location.assign(myUrl);
 }

//  document.getElementById('button1').addEventListener("click", ChangePage);
$('#button1').click(function(e){
    window.location.href="./index.html"
})
