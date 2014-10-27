var _POST = function (url, data,dataType,  callback){
	var options = {};

	options.type = 'POST';
	options.url = document.config.host+url;
	options.crossDomain = true;
	options.dataType = dataType;

	options.data = data;
	
	options.success = function (_d){callback(_d)}
	options.error = function(_e){callback(_e)}
  
    // options.contentType = 'application/json';

	$.ajax(options);
} 

var _GET = function (url, dataType, callback){
	var options = {};

	options.type = 'GET';
	options.url = document.config.host+url;
	options.crossDomain = true;
	options.dataType = dataType;

	options.success = function (_d){callback(_d)}
	options.error = function(_e){callback(_e)}

    options.contentType = 'application/json';

	$.ajax(options);
} 

var _DELETE = function(url, data, dataType, callback){
	var options = {};

	options.type = 'DELETE';
	options.url = document.config.host+url;
	options.crossDomain = true;
	options.dataType = dataType;

	options.data = data;
	
	options.success = function (_d){callback(_d)}
	options.error = function(_e){callback(_e)}
  
    // options.contentType = 'application/json';

	$.ajax(options);
}