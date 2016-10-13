jQuery(document).ready(function(){
	//Right Click Protection
	//$(document).bind("contextmenu",function(e){ return false;});

	//Content Area Mods
	$(".pagecontainer > table:eq(1)").addClass("pst-background");
	$(".pagecontainer > table:eq(1) tr:first td:first").addClass("pst-main");
	$(".pst-background table:eq(1)").addClass("pst-content");

	//Getting and Setting Store Categories
	if($("#pst-categories").length > 0) {
		if($("#LeftPanel .lcat").length > 0) {
			$("#pst-categories").html($("#LeftPanel .lcat").html());
		}
		$("#pst-categories ul[class=lev2]").find("li:last").addClass("pst-lastitem");
	}

	//Search Box
	var stxt = $("#pst-search #pst-input").find("input[class=v4sbox]").val();
	$("#pst-search #pst-input").find("input[class=v4sbox]").focus(function(){
		if($("#pst-search #pst-input").find("input[class=v4sbox]").val() == stxt) {
			$("#pst-search #pst-input").find("input[class=v4sbox]").val("");
		}
	});
	$("#pst-search #pst-input").find("input[class=v4sbox]").blur(function(){
		if($("#pst-search #pst-input").find("input[class=v4sbox]").val() == "") {
			$("#pst-search #pst-input").find("input[class=v4sbox]").val(stxt);
		}
	});
	$("#pst-search #pst-submit").find("input").click(function(){
		if($("#pst-search #pst-input").find("input[class=v4sbox]").val() == stxt) {
			$("#pst-search #pst-input").find("input[class=v4sbox]").val("");
		}
	});


//Footer
	var d = new Date();
	var footer = "\n\r<div class=\"pst-wrapcens\"><div id=\"pst-footer\"><div id=\"pst-footernav\"><ul><li><a href=\"http://stores.ebay.com.au/maureenshomestore/pages/about-us/_i.html?_mode=preview\">About Us<\/a><\/li><li><a href=\"http://stores.ebay.com.au/maureenshomestore/pages/payment/_i.html?_mode=preview\">Payment<\/a><\/li><li><a href=\"http://stores.ebay.com.au/maureenshomestore/pages/shipping/_i.html?_mode=preview\">Shipping<\/a><\/li><li><a href=\"http://feedback.ebay.com.au/ws/eBayISAPI.dll?ViewFeedback2&userid=mausham&ftab=AllFeedback\">Feedback<\/a><\/li><li><a href=\"http://stores.ebay.com.au/maureenshomestore/pages/contact-us/_i.html?_mode=preview\">Contact Us<\/a><\/li><\/ul><\/div><div id=\"pst-copy\"> Copyright &copy; " + d.getFullYear() +", <span class=\"elinks\">Maureen's Home Store<\/span> - All rights reserved.<\/div><div id=\"pst-designer\">eBay Store Design by <a target=\"_blank\" href=\"http://www.upwork.com/o/profiles/users/_~015b640ac53e133434/\"><span class=\"elinks\">Mohammad Ali.<\/span><\/a><\/div><\/div><\/div>";
	if(pageName != "PageAboutMeViewStore") {
		if($(".pst-content").length > 0) {
			$(".pst-content").after(footer);
		}
	}
});
