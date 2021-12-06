window.addEventListener("load", function () {
    localStorage.setItem("id", -1);
    console.log(localStorage.getItem("id"));
    function sendData() {
        console.log("Logging in...");

        const XHR = new XMLHttpRequest();
        const FD = new FormData( login );

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
        const FD = new FormData( signup );

        XHR.addEventListener("error", function(event) {
            alert('Something went wrong...');
        });

        XHR.open("POST", `http://${location.hostname}:5000/app/new/user`);
        XHR.send( FD )

        XHR.addEventListener('load', function(event) {
            alert("New user created. Logging in now...")
        })

        const XHR2 = new XMLHttpRequest();
        const FD2 = new FormData();
        FD2.append("user", FD.user);
        FD2.append("pass", FD.pass);

        XHR2.addEventListener("error", function(event) {
            alert('Something went wrong...');
        });

        XHR2.addEventListener( "load", function(event) {
            alert( event.target.responseText );
        });

        XHR2.open("GET", `http://${location.hostname}:5000/app/users/login/${FD2.get("user")}&${FD2.get("pass")}`);
        XHR2.send();

        var json = (JSON.parse(XHR2.response));
        console.log(json);
        localStorage.setItem("id", json.id);
        location.href("./gamePage.html");

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