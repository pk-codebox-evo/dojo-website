<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit TextBoxes</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<h1>dijit/form/TextBox and dijit/form/SimpleTextarea</h1>
		<div>
			<label for="text">Name:</label>
			<input id="text" data-dojo-type="dijit/form/TextBox"
				data-dojo-props="placeHolder:'Enter text here.'">
		</div>
		<div>
			<label for="textarea">Description:</label>
			<textarea id="textarea" rows="5" cols="50"
				data-dojo-type="dijit/form/SimpleTextarea"
			 	data-dojo-props="
					onFocus:function(){ console.log('textarea focus handler') },
					onBlur:function(){ console.log('textarea blur handler') },
					selectOnClick:true
			">This is a sample SimpleTextarea.</textarea>
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>
			// load requirements for declarative widgets in page content
			require(["dojo/parser", "dijit/form/TextBox", "dijit/form/SimpleTextarea", "dojo/domReady!"]);
		</script>
	</body>
</html>
