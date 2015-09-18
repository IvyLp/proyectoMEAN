
/* GET home page. */
var mongoose = require('mongoose');
var Tareas = mongoose.model('Tareas');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//GET - Listar Tareas
exports.tasks = function(req,res,next){
	Tareas.find(function(err,tareas){
		if(err){return next(err)}
		res.json(tareas)
	});
};

//POST - Agregar Tareas
exports.tasks_post = function(req,res,next)
{
	var tarea = new Tareas(req.body);
	tarea.save(function(err,tarea){
		if(err){return next(err)}
		res.json(tarea);
	});
};

//PUT(post) - Actualizar Tareas esta versión no admite metods PUT
exports.tasks_put = function(req,res,next)
{
	Tareas.findById(req.params.id,function(err, tarea){
		tarea.nombre = req.body.nombre;
		tarea.prioridad = req.body.prioridad;
		tarea.save(function(err,tarea){
			if(err){return send(err)}
			res.json(tarea);
		});
	});
	//res.send(req.params.id);
};
//DELETE(post) - Eliminar Tarea esta versión no adminte el metodo DELETE
exports.tasks_delete = function(req,res,next)
{
	Tareas.findByIdAndRemove(req.params.id, function(err){
		if(err){return send(err)}
			res.json({message: 'La tarea se ha eliminado'});
	});
}