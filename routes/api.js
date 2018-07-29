const express = require('express');

const router = express.Router(); //we can store our route handler here

const Ninja = require('../models/ninja');



//instead of app.get use router
router.get('/ninjas',function(req,res){

//using url parameters providing exact latitude and longi


/*Ninja.find({}).then(function(ninjas){

  res.send(ninjas);
});
*/

  //using geonear
  //yahan maine aggregate ke andar near ka array le liya
  Ninja.aggregate({

$geoNear:{
  near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
   maxDistance: 100000,spherical: true,distanceField:"distance.calculated"}
}).then(function(ninjas){
    res.send(ninjas);
  });

});

router.post('/ninjas',function(req,res,next){
//adds new ninja to data

var ninja = new Ninja(req.body);
 //saves data in mongo
Ninja.create(req.body).then(function(ninja){
  res.send(ninja);

}).catch(next);



});

//update a ninja in database
router.put('/ninjas/:id',function(req,res,next){

Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
Ninja.findOne({_id:req.params.id}).then(function(ninja)
{
  res.send(ninja);
});

});




});

//delete data
router.delete('/ninjas/:id',function(req,res,next){
//console.log(req.params.id);

Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja)
{
res.send(ninja);

});
   res.send({type:'DELETE'});
});
module.exports = router;
