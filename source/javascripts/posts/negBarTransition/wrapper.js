var interpolationLine = graphs.interpolationLine()
		.parent(d3.select('#interpolationLine').node())
		.ease('cubic-in-out')
		.draw();

var tweenCandleBar = graphs.candleBar()
		.parent(d3.select('#tweenCandleBar').node())
		.draw();


var naiveCandleBar = graphs.candleBar()
		.parent(d3.select('#naiveCandleBar').node())
		.draw();


var dispatchingGraphs = [interpolationLine];
var listeningGraphs = dispatchingGraphs.slice().concat([tweenCandleBar, naiveCandleBar]);

dispatchingGraphs.forEach(function(graph){
	graph.on('mouseT', updateHover);
})


function updateExtent(extent){
	var yScale = tweenCandleBar.yScale();
	yScale.domain(extent);

	var i = d3.interpolate(extent[0], extent[1]);
	tweenCandleBar
			.extent(extent)
			.heightF(compose(valToHeight, i))
			.yF(compose(valToY, i))

	var hExtent = extent.map(valToHeight)
	var yExtent = extent.map(valToY)
	naiveCandleBar
			.extent(extent)
			.heightF(d3.interpolate(hExtent[0], hExtent[1]))
			.yF(d3.interpolate(yExtent[0], yExtent[1]))

	function valToHeight(d){ return yScale(0) - yScale(Math.abs(d)); }
	function valToY(d){ return yScale(d > 0 ? d : 0); }


}
updateExtent([-15, 10])



function updateHover(t){
	listeningGraphs.forEach(function(graph){
		graph.mouse(t);
	})
}
updateHover(0);
