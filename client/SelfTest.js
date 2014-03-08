
Session.setDefault("istologin",false);

Session.setDefault("istoregister",false);

Session.setDefault("isError",false);

Session.setDefault("isErrorlogin",false);

Session.setDefault("comsObj",null);

Template.manage.istologin = function(){
	return Session.equals("istologin",true);
};

Template.manage.istoregister =function(){
	return Session.equals("istoregister",true);
};

Template.manage.isError = function(){
	return Session.equals("isError",true);
};

Template.manage.error = function(){
	return Session.get('errorInfo');
};

Template.manage.isErrorlogin = function(){
	return Session.equals('isErrorlogin',true);
};

Template.manage.errors = function(){
	return Session.get('errorsInfo');
};

Template.mainlayout.msg = function(){
	 return Msg.find({},{sort:{sayTime:-3}});
};
Template.mainlayout.printComments = function(){
	return Msg.find({"_id":Session.get('comsObj')});
	
}
