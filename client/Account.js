Meteor.subscribe("usersData");


Template.manage.events({
	'click #tologin':function(){
		Session.set("istologin",true);

	},
	'click #toregister':function(){
		Session.set("istoregister",true);
	}

});

Template.register.events({
	'blur #registerName':function(e,t){
		var uname = e.target.value;
		if(uname ==""){
			Session.set("errorInfo","username cloud not be empty!");
			Session.set("isError",true);
		}else{
			Meteor.call("checkExist",uname,function(err){
			if(err){
				Session.set("errorInfo",err.reason);
				Session.set("isError",true);
				$('#registerName').val('');
				return false;
				}else{
					Session.set("isError",false);
				}
			})

		}
		
	},
	'focusout #registerPwd':function(e,t){
		if(e.target.value.length<6){
			Session.set("errorInfo","Make sure your password's length >= 6");
			Session.set("isError",true);
		}else{
			Session.set("isError",false);	//hide error
		}
	},
	'focusout #confirmPwd':function(e,t){
		if(e.target.value != $('#registerPwd').val()){
			Session.set("errorInfo","Please Confirm your password !")
			Session.set('isError',true);
		}else{
			Session.set('isError',false);
		}
	},
	'click #register':function(e,t){		
		var registerName = $('#registerName').val();
		var registerPwd = $('#registerPwd').val();
		var confirmPwd = $("#confirmPwd").val();
		var email = $('#registerEmail').val();
		var isverify = verification(registerName,registerPwd,confirmPwd,email);
		if(isverify){
			register(registerName,email,registerPwd);
		}
	}
});

Template.Login.events({
	'click #signin':function(){
		var loginName = $('#userName').val();
		var loginPwd = $('#userPwd').val();
		if(!loginName || !loginPwd ){
			Session.set('errorsInfo',"You must write your name and password");
			Session.set('isErrorlogin',true);
		}else{
			userLogin(loginName,loginPwd);
		}
	}
});

Template.logout.events({
	'click #toout':function(){
		Meteor.logout();
	}

});


var verification = function(name,pwd,confirmPwd,email){
	var Reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if(!name||!pwd||!confirmPwd||!email){
		//here we also do not neet EJSON.parse().but just as study; :)
		var info = EJSON.parse('"System cloud not accept empty!"');
		Session.set("errorInfo",info);
		Session.set("isError",true);
		return false;
	}else if(!Reg.test($('#registerEmail').val())){
		Session.set('errorInfo',"Your email is ILLEGAL!");
		Session.set('isError',true);
		$('#registerEmail').select();
		return false;
	}
	return true;

};

var userLogin = function(username,password){
	Meteor.loginWithPassword(username,password,function(err){
		if(err){
			Session.set('errorsInfo',err.reason);
			Session.set("isErrorlogin",true);
		}else{
			Session.set("isErrorlogin",false);
			Session.set("istologin",false);	//to show the mainlayout
		}
	});
}
var register = function(username,email,password){
	Accounts.createUser({
		username:username,
		email:email,
		password:password,
	},function(err){
		if(err){
			Session.set('errorInfo',err.reason);
			Session.set('isError',true);
		}else{
			Session.set('isError',false);
			Session.set('istoregister',false);//to show the mainlayout
		}	
	}
	);	
};
