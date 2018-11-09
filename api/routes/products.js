const express = require('express');
const router = express.Router();

const Product = require('../models/products');
const mongoose = require('mongoose');


//handle incoming get request
router.get('/',(req,res,next)=>{
    Product.find()
        .exec()
        .then(data=>{
            console.log('Data from db',data)
            
                res.status(200).json(data);
            
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err})
        })
   
});

router.post('/',(req,res,next)=>{
    console.log(req.body)
   const product = new Product({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       price:req.body.price
   });

   
   product.save().then(result=>{
       console.log(result);
   }).catch(err=> console.log(err));
    res.status(201).json({
        message:"New product added!",
        data: product
    });
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(data=>{
            console.log(data)
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json({message:'No entery found for this id!'});
            }
           
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err})
        })
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    var product = new Object();
    product ={
        name:req.body.name,
        price:req.body.price
    }
    Product.update({_id:id},req.body)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    Product.deleteOne({_id:id})
        .exec()
        .then(data=>{
            console.log('data from db');
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({error:err});
        })
});

module.exports = router;