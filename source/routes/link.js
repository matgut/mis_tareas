const express = require('express');
const router = express.Router();

const pool = require ('../db');

router.get('/agregar',(req, res) =>{
    res.render('links/agregar');
});

module.exports = router;
