function sendVal(val) {
    var myUrl="./application.html"+"?"+"val="+val;
    window.location.assign(myUrl);
 }

//  document.getElementById('button1').addEventListener("click", ChangePage);
document.getElementById('slide-fatal-button').click(function(e){
    window.location.href="./index.html"
})
