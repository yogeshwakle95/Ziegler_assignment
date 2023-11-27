const featuredModel = require("../models/featuredSchema");
const factory = require('./handlersFactory');

exports.createFeatured = factory.createOne(featuredModel);

exports.getAllFeatured = async(req,res)=>{
      featuredModel.find()
      .then((data)=>{
        res.status(201).json(data);
      }).catch((error)=>{
        res.status(501).json({message:"Error occurs: "+error});
      })
}

exports.getOneFeatured = async(req,res)=>{
    const Id = req.params.id;
    featuredModel.findByIdAndUpdate(Id)
    .then((data)=>{
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.status(201).json(data);
    }).catch((error)=>{
        res.status(501).json({message:"Error occurs: "+error})
    });
}

exports.UpdateFeatured = async(req,res)=>{
     const Id = req.params.id;
     featuredModel.findByIdAndUpdate(Id,req.body,{new:true})
     .then((data)=>{
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.status(201).json(data)
     }).catch((error)=>{
        res.status(501).json({message:"error occurs: "+error});
     })
}

exports.deleteFeatured = async (req, res) => {
    try {
      const Id = req.params.id;
      const data = await featuredModel.findByIdAndDelete(Id, req.body);
  
      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      res.status(201).send(); // 204 indicates success with no content
    } catch (error) {
      res.status(501).json({ message: "Error occurs: " + error });
    }
  };
  