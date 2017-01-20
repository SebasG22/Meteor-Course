this.Documents = new Mongo.Collection("documents");

/*var myVar = 10;*/

if (Meteor.isClient){

	//Session.set("current_date",new Date());


/*
	Meteor.setInterval(function (){
		Session.set("current_date",new Date());
	},1000);


	Template.date_display.helpers({
		current_date:function(){
			return Session.get("current_date");
		},
		myVar:function(){
			return myVar;
		}
	});
*/

	Template.editor.helpers({
		docid:function(){
		 var doc = Documents.findOne();
		 	if(doc){
				return doc._id;
			}
			else{
				return undefined;
			}
		},
		config:function(){
			return function (editor){
				editor.on("change",function(cm_editor,info){
					console.log(cm_editor.getValue());
					$("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
				})
			}
		}
	});
}

if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
		if (!Documents.findOne()){
			// no documents yet !
			Documents.insert({title:"my new document"});
		}
	})
}
