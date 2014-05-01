Session.setDefault("comsObj",null);

Meteor.subscribe("userDate");

Session.setDefault("currentPage",1);

Session.setDefault("isAdmin",false);

Template.mainlayout.msg = function(){
	 return Msg.find({},
	 	{
	 		skip:(Session.get('currentPage')-1)*8,
	 		sort:{sayTime:-3},
	 		limit:8
	});
};
Template.mainlayout.printComments = function(){
	return Msg.find({"_id":Session.get('comsObj')});
};

Template.usersComments.details = function(){
	if(Session.get('currentName')!=null){
		var getComments = Msg.find({"uname":Session.get('currentName')},{fields:{uname:0},sort:{sayTime:-1}});
		return getComments;
	}
};
