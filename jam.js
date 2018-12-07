
$f(window).load(function(){
	$f.ajax({
	method : "post",
	url : "https://cdn.jsdelivr.net/gh/danish1u/Maureen-eBay/new.php",
	async:false,
	data:"newarrival=1",
	success: function(result){
		$f("#product_newlyarrived").html(result);
	},
});
});
