function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

let key = getCookie("key-auth");
if(!key) {
	$("#input-container").show();
	$("#logout").hide();
} else {
	$("#input-container").hide();
	$("#logout").show();
	getInfo(key);
}

$(document).on('click', "#submit", () => {
	let auth = $("#auth");
	if (auth.val() != "") {
		getInfo(auth.val());
	}
});

$(document).on('click', "#logout", () => {
	setCookie('key-auth',"", -1);
	window.location.reload();

});

function getInfo(auth) {
	$.ajax({
			url: 'http://localhost/extension/html/connexion.php',
			type: "POST",
			data: {
				key: auth
			},
			success: (data) => {
				if (data != "Error") {
					$("#info-content").html(data);
					setCookie('key-auth',auth, 365);
					$("#input-container").hide();
					$("#logout").show();
				} else {
					$("#info-content").html("An error occured !");
					$("#input-container").show();
					$("#logout").hide();
				}
			}
	});
}
