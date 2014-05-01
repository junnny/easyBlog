easyBlog
========
recently i update this simple web application .  
before the update,when you visit my Meteor web application you will find it's so bad that you will
spend 6s (even more)to waiting the data loaded.Howere,now,i use the technolog of paging,
so, at present,you can get it within 2s.  
How can i do it?
================
```
Template.mainlayout.msg = function(){
	 return Msg.find({},  
	 	{  
	 		skip:(Session.get('currentPage')-1)*8,  
	 		sort:{sayTime:-3},  
	 		limit:8  
	});
};
```  
so,we can get eight records from Database per access.when the user first time to visit the web site.only load eight records.  
##### This is last,all the codes is here #####
