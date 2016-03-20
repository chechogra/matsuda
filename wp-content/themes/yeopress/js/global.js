require.config({
	"baseUrl": "wp-content/themes/yeopress/js",
	"paths": {
		"jquery": "vendor/jquery/jquery"
	}
});

require(['jquery'], function($) {
	console.log('Working!!');
});
