function toggleForm (targetId) {
	var target = document.getElementById(targetId);
	if (target.className == "show") {
		target.className = "hide";
	}
	else{
		target.className = "show";
	}
}