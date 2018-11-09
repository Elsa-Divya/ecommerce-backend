const express = require('express');
const router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:'Orders were fetched'
    })
})

router.get("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message:'Orders details',
        id:id

    })
})

router.post("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    res.status(201).json({
        message:'Order created',
        id:id

    })
})

router.patch("/:orderId",(error,req,res,next)=>{
    const id = req.params.orderId;
    if(id==300){
        res.status(200).json({
            message:'Order updated',
            id:id
    
        })
    }
    
})

router.delete("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message:'Order deleted',
        id:id

    })
})

module.exports = router;