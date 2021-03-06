const Thing = require("../models/thing");


exports.createThing = (req, res, next) => {
    // delete req.body._id;
    const thing = new Thing({
      // ...req.body
      title : req.body.title,
      description : req.body.description,
      imageUrl : req.body.imageUrl,
      userId : req.body.userId,
      price : req.body.price
    });
    thing.save()
    .then(() => res.status(201).json({message : "object committed in the db successefully!"}))
    .catch(error => res.status(400).json({error : error}));
};

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({_id : req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message  : 'Object modifie!' }))
    .catch(error => res.status(400).json({error}));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error : error}));
};