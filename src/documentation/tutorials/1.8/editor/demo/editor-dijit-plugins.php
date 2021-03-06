<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Additional Dijit Plugins</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Additional Dijit Plugins</h1>
		<div data-dojo-type="dijit/Editor" style="width:800px;min-height:100px;" data-dojo-props="extraPlugins:['foreColor','hiliteColor','|','createLink','insertImage','fullscreen','viewsource','newpage']">
			This is the <strong>default</strong> content.
		</div>
		<?php
			Utils::printDojoScript("async: true,parseOnLoad: true");
		?>
		<script>
			// Include the class
			require(["dijit/Editor", "dojo/parser", "dijit/_editor/plugins/TextColor", "dijit/_editor/plugins/LinkDialog", "dijit/_editor/plugins/FullScreen", "dijit/_editor/plugins/ViewSource", "dijit/_editor/plugins/NewPage"]);
		</script>
	</body>
</html>
