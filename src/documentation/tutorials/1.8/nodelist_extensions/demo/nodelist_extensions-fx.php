<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: NodeList Extensions: dojo/NodeList-fx</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
		<style>
			li { position: relative; width: 400px; }
		</style>
	</head>
	<body class="claro">
		<h1>Demo: NodeList Extensions: dojo/NodeList-fx</h1>
		<button type="button" id="btn">Highlight fresh fruits</button>

		<h3>Fruits</h3>
		<ul style="position:relative">
			<li class="fresh">Apples</li>
			<li class="fresh">Persimmons</li>
			<li class="fresh">Grapes</li>
			<li class="fresh">Fresh Figs</li>
			<li class="dried">Dates</li>
			<li class="dried">Raisins</li>
			<li class="dried">Prunes</li>
			<li class="fresh dried">Apricots</li>
			<li class="fresh">Peaches</li>
			<li class="fresh">Bananas</li>
			<li class="fresh">Cherries</li>
		</ul>
		<?php
			Utils::printDojoScript("async: true");
		?>
		<script>	
			require(["dojo/query", "dojo/NodeList-fx", "dojo/domReady!"], function(query){
				query("#btn").on("click", function(){
					query("li.fresh")
						.slideTo({
							left: 200, auto: true
						})
						.animateProperty({
							properties: {
								backgroundColor: { start: "#fff", end: "#ffc" }
							}
						})
						.play();
				});
			});
		</script>
	</body>
</html>
