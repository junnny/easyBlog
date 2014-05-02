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

## License

( The MIT License )

Copyright (c) 2013 - 2014 David Zhang

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
