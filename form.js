window.addEventListener("load", function () {
    function sendData() {
        console.log("Logging in...");

        const XHR = new XMLHttpRequest();
        const FD = new FormData( form );

        XHR.addEventListener("error", function(event) {
            alert('Something went wrong...');
        });

        XHR.addEventListener( "load", function(event) {
            alert( event.target.responseText );
        });

        XHR.open("GET", `http://${location.hostname}:5000/app/users/login/${FD.get("user")}&${FD.get("pass")}`);
        XHR.send();
        XHR.onreadystatechange = function() {
            if (this.readyState == 4 & this.status == 200) {
                if (XHR.response == "") {
                    alert("Incorrect Username or Password!");
                } else {
                    var json = JSON.parse(XHR.response);
                    console.log(json);
                    localStorage.setItem("id", json.id);
                    location.href("./gamePage.html");
                }
            }
        }
        
    }

    function sendData2() {
        console.log("Signing up...");
        
        const XHR = new XMLHttpRequest();
        const FD = new FormData( form );

        XHR.addEventListener("error", function(event) {
            alert('Something went wrong...');
        });

        XHR.addEventListener( "load", function(event) {
            alert( event.target.responseText );
        });

        XHR.open("POST", `http://${location.hostname}:5000/app/new/user`);
        XHR.send( FD )

        
    }



    const login = document.getElementById("login");
    login.addEventListener("submit", function(event) {
        event.preventDefault();
        sendData();
    });

    const signup = document.getElementById("signup");
    signup.addEventListener("submit", function(event) {
        event.preventDefault();
        sendData2();
    });
})