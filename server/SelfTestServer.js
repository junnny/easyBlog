
Msg = new Meteor.Collection("messages");

Meteor.publish("userDate",function(){
	return Meteor.users.find({},{fields:{services:0}});
});

//publish Msg doc


Meteor.publish("messages",function(){
	return Msg.find();
});

/*add the admins to manager the website*/
function adminManager_dw(userId){
	var dw = Meteor.users.findOne({username:'David'});
	if(dw && userId && userId == dw._id){
		return true;
	}
	return false;
}

function adminManager_wxx(userId){
	var wxx = Meteor.users.findOne({username:'星爷狂砍五十条街'});
	if(wxx && userId && userId == wxx._id){
		return true;
	}
	return false;
}

Msg.allow({
	remove:function(userId,docs){
		if(adminManager_wxx(userId) || adminManager_dw(userId)){
			return true;
		}
		return false;
	}
});
/*post messages or comments*/
Meteor.methods({
	postMsg:function(username,messages,time){
		//var random = Random.id();
		var comments =[];
		if(username && messages!=null && time !=null){
			Msg.insert({uname:username,messages:messages,sayTime:time,comments:comments});
		}else{
			throw new Meteor.Error(403,"请合法的使用本站");
		}
	},
	toComments:function(ObjId,comments){
		//var random = Random.id();
		if(ObjId && comments !=null && comments.time !=null){
			Msg.update(ObjId,
			{
				$push:{"comments":comments}
			},function(err,affected){
				if(err){
					throw new Meteor.Error(403,"sorry,a Mistack was happened !")
				}
			});
		}else{
			throw new Meteor.Error(403,'请合法使用本站');
		}
	}

});