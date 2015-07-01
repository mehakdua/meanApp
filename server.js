var express = require('express');
var app = express() 
var mongojs=require('mongojs')
var db = mongojs('contactlist',['contactlist']);
var bodyparser=require('body-parser')
app.use(bodyparser.json());
app.get('/contactlist',function(req,res){
	db.contactlist.find(function(error,docs){
		res.json(docs)
	})
});
app.post('/contactlist',function(req,res){
	 db.contactlist.insert(req.body,function(error,docs){
	 	res.json(docs)

	 })
});
app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log("del"+ id)
	db.contactlist.remove({ _id:mongojs.ObjectId(id)},function(error,docs){
	 res.json(docs)
	 })
})
app.get('/contactlist/:id',function(req,res){
var id = req.params.id;
db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(error,docs){
	 res.json(docs)
	})
})
app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log("put"+id)
	db.contactlist.findAndModify({query:{ _id:mongojs.ObjectId(id)},
	update:{$set:{name:req.body.name,contact:req.body.contact}},
	new:true},function(error,docs){
		res.json(docs)
	 
	
})
})
app.use(express.static(__dirname+'/public'));
app.listen('3000',function(){
	console.log("server listenin");
});