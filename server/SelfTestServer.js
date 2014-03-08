
Msg = new Meteor.Collection("messages");


Meteor.publish("usersData",function(){
	return Meteor.users.find({},{fields:{services:0}});
});

//publish Msg doc


Meteor.publish("messages",function(){
	return Msg.find();
});

// whether the user name is exist

Meteor.methods({
	checkExist:function(user){
		check(user,String);
		var uname = Meteor.users.findOne({username:user});
		if(uname){
			throw new Meteor.Error(403,"User has Exist !");
		}
	},
	postMsg:function(username,messages,time){
		var random = Random.id();
		var comments =[];
		if(random){
			Msg.insert({uname:username,messages:messages,sayTime:time,comments:comments});
		}else{
			throw new Meteor.Error(403,"请合法的使用本站");
		}
	},
	toComments:function(ObjId,contents,time){
		var random = Random.id();
		if(random){
			Msg.update(ObjId,
			{
				$push:{"comments":contents}
			},function(err,affected){
				if(err){
					throw new Meteor.Error(403,"sorry,a Mistack was happened !")
				}
			});
		}
	}

});