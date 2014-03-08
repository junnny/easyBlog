Msg = new Meteor.Collection("messages");

Meteor.subscribe("messages");


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
		if(userMsg.length<6 || userMsg >38){
			alert("length >= 6 && length <=38");
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
		})
		$('#comments').val("");
	},
	'mouseenter .clickToSee':function(e,t){
		Session.set('comsObj',this._id);
	},
	//为什么要写这两个差不多一样的？我偷懒了，哈哈
	'click .clickToSee':function(e,t){
		Session.set('comsObj',this._id);
	}
});