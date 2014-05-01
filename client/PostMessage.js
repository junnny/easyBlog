Msg = new Meteor.Collection("messages");

Meteor.subscribe("messages");

Session.setDefault('currentName',null);

Template.postMsg.events({
	'click #post_Msg':function(){
		var date = new Date();
		var time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+"-"+(date.getMonth()+1),
			day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
			minute:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
	};
		var userMsg = $('#content').val();
		if(userMsg.length<6 || userMsg.length >38){
			alert("length >= 6 && length <=38");
			$('#content').select();
			return false;
		}else{
			Meteor.call("postMsg",Meteor.user().username,userMsg,time,function(err){
				if(err){
					alert(err.reason);
				}else{
					$('#content').val(''); //empty
				}
			})
		}
	},
	'click #content':function(e,t){
		$('#content').focus();
		$("#content").select();
	}
});

//下面这是对于评论功能的晚上
Template.mainlayout.events({
	'click .comment':function(e,t){
		Session.set('currentId',this._id);
	},
	'click #subContent':function(e,t){
		var commentCon = $('#comments').val();

		var date = new Date();
		var time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+"-"+(date.getMonth()+1),
			day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
			minute:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
		};

		var comments = {
			time:time,
			contents:commentCon,
			comment_user:Meteor.user().username
		}

		if(commentCon.length=="" || commentCon.length>38){
			alert('请按要求发表评论');//这里要做修改
			return false;
		}
		Meteor.call('toComments',Session.get('currentId'),comments,function(err,index){
			if(err){
				alert(err.reason);
			}
		});
		$('#comments').val("");
	},
	'mouseenter .clickToSee':function(e,t){
		Session.set('comsObj',this._id);
	},
	//为什么要写这两个差不多一样的？我偷懒了，哈哈
	'click .clickToSee':function(e,t){
		Session.set('comsObj',this._id);
	},
	'click #next':function(e,t){
		var count = Session.get('currentPage');
		var total = Msg.find().count();
		if(count*8 - total < 0){
			count+=1;
			Session.set('currentPage',count);
		}else{
			alert("已是最后一页！");
		}	
	},
	'click #pre':function(e,t){
		var count = Session.get('currentPage');
		if(count<=1){
			alert("已是第一页！");
		}else{
			count -=1;
			Session.set('currentPage',count);
		}

	},
	'click .removeMsg':function(e,t){
		if(Meteor.user()){
			if(Meteor.user().username =='David' || Meteor.user().username =='星爷狂砍五十条街'){
				if(confirm('确认要删除？')){
					Msg.remove({'_id':this._id},function(err){
						if(err){
							alert('错误原因：\n如果想删除此贴，请联系管理员');
						}
					});
				}else{
					return false;
				}
			}else{
				alert('您暂时没有权限操作，请联系管理员删除此贴');
			}
		}else{
			alert('您暂时没有权限操作，请联系管理员删除此贴');
		}
	}
});
Template.usersComments.events({
	'click #clicktoComments':function(){
		if(Session.get('currentName') !=null){
			Session.set('currentName',null)
		}else{
			Session.set('currentName',Meteor.user().username);
		}
		Deps.flush();
	},
});
