
$f(window).load(function(){
	$f.ajax({
	method : "post",
	url : "https://cdn.rawgit.com/danish1u/Maureen-eBay/master/new.php",
	async:false,
	data:"newarrival=1",
	success: function(result){
		$f("#product_newlyarrived").html(result);
	},
});
});
