function setAlreadySubmit() {
	document.cookie = 'already_submit=1';
}

function checkRedirect() {
	if (document.cookie.split('already_submit=1').length == 2) {
		window.location.href = '/';
	}
}

checkRedirect();