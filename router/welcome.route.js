const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("<h1>Welcome Guvi Backend Server")
});

module.exports = router;