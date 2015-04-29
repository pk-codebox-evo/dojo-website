<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Publish and Subscribe with dojo/topic</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Publish and Subscribe with dojo/topic</h1>
		<button id="alertButton">Alert the user</button>
		<button id="createAlert">Create another alert button</button>
		<?php
                        Utils::printDojoScript("async: true");
		?>
		<script>

			require(["dojo/on", "dojo/topic", "dojo/dom", "dojo/dom-construct", "dojo/domReady!"], function(on, topic, dom, domConstruct) {
				var alertButton = dom.byId("alertButton"),
					createAlert = dom.byId("createAlert");

				on(alertButton, "click", function() {
					// When this button is clicked,
					// publish to the "alertUser" topic
					topic.publish("alertUser", "I am alerting you.");
				});

				on(createAlert, "click", function(evt){
					// Create another button
					var anotherButton = domConstruct.create("button", {
						innerHTML: "Another alert button"
					}, createAlert, "after");

					// When the other button is clicked,
					// publish to the "alertUser" topic
					on(anotherButton, "click", function(evt){
						topic.publish("alertUser", "I am also alerting you.");
					});
				});

				// Register the alerting routine with the "alertUser"
				// topic.
				topic.subscribe("alertUser", function(text){
					alert(text);
				});
			});

		</script>
	</body>
</html>