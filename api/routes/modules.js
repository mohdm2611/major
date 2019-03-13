const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Modulesmade = require('../models/modulesmade');
const Modulesactive  = require('../models/modulesactive');
const Modulesoverflow  = require('../models/modulesoverflow');
const Esp8266one  = require('../models/ESp8266ONE');



router.post('/check', (req, res, next) =>{
    const moduleid = req.body.moduleID;
    console.log(moduleid);
    Modulesmade.find({ moduleID : moduleid })
    .exec()
    .then(doc =>{
        console.log("From database"+doc);
        if(!(doc == 0)){
            //res.status(200).json(doc);
            Modulesactive.find({ moduleID : moduleid })
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc == 0){
                    const modulesactive = new Modulesactive({
                        _id: new mongoose.Types.ObjectId(),
                        moduleID: req.body.moduleID,
                        mappedTo: req.body.mappedTo,
                        type: req.body.type
                    });
                    modulesactive.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message : "Created module",
                            modules : {
                                moduleID: result.moduleID,
                                id: result._id,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:8000/modules/' + result._id
                                }
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    }); 
                }
                else{
                    res.status(404).json({message: 'Already Scanned module'});                                         
                }
            })   
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            })
        }
        else{
            res.status(404).json({message: 'Module does not exist'}); 
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});


// router.get('/', (req, res, next) => {   
//     Moduledata.find()
//     .select('moduleID mappedTo type status')
//     .exec()
//     .then(docs => {
//         const response = {
//             count: docs.length,
//             modules: docs.map(doc => {
//                 return {
//                     moduleID: doc.moduleID,
//                     mappedTo: doc.mappedTo,
//                     type: doc.type,
//                     status: doc.status,
//                     id: doc._id,
//                     request: {
//                         type: 'GET',
//                         url: 'http://localhost:8000/modules/' + doc._id
//                     }
//                 }
//             })
//         }
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     });
// });

router.get('/active', (req, res, next) => {   
    Modulesactive.find()
    .select('moduleID mappedTo type')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            modules: docs.map(doc => {
                return {
                    moduleID: doc.moduleID,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/modules/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


router.post('/insert', (req, res, next) => {
    const esp8266one = new Esp8266one({
        _id: new mongoose.Types.ObjectId(),
        moduleID: req.body.moduleID,
        mappedTo: req.body.mappedTo,
        value: req.body.value
    });
    esp8266one.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Created module",
            modules : {
                moduleID: result.moduleID,
                mappedTo: result.mappedTo,
                value: result.value,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/modules/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});


router.post('/made', (req, res, next) => {
    const modulesmade = new Modulesmade({
        _id: new mongoose.Types.ObjectId(),
        moduleID: req.body.moduleID,
        type: req.body.type,
    });
    modulesmade.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Created module",
            modules : {
                moduleID: result.moduleID,
                type: result.type,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/modules/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});


router.post('/overflow', function(req, res, next){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var myDate = new Date(date);
    console.log(myDate.toString());
    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getDate()  + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    console.log(datetime);
    const modulesoverflow = new Modulesoverflow({
        _id: new mongoose.Types.ObjectId(),
        moduleID: req.body.moduleID,
        time: datetime,
        value: req.body.value
    });
    modulesoverflow.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Created module",
            modules : {
                moduleID: result.moduleID,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/modules/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


// router.post('/', (req, res, next) => {
//     const moduledata = new Moduledata({
//         _id: new mongoose.Types.ObjectId(),
//         moduleID: req.body.moduleID,
//         mappedTo: req.body.mappedTo,
//         type: req.body.type,
//         status: req.body.status
//     });
//     moduledata.save()
//     .then(result => {
//         console.log(result);
//         res.status(201).json({
//             message : "Created module",
//             modules : {
//                 moduleID: result.moduleID,
//                 mappedTo: result.mappedTo,
//                 type: result.type,
//                 status: result.status,
//                 id: result._id,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:8000/modules/' + result._id
//                 }
//             }
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     });
    
// });

// router.get('/:moduleId', (req, res, next) =>{
//     const id = req.params.moduleId;
//     Moduledata.findById(id)
//     .exec()
//     .then(doc =>{
//         console.log("From database"+doc);
//         if(doc){
//             res.status(200).json(doc);
//         }
//         else{
//             res.status(404).json({message: 'No Valid Entry Found'});    
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     })
// });

// router.patch('/:moduleId', (req, res, next) => {
//     const id = req.params.moduleId;
//     const updateops = {};
//     for(const ops of req.body){
//         updateops[ops.propName] = ops.value;
//     }
//     Moduledata.update({ _id: id}, { $set: updateops })
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json({result});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     })
// })

// router.delete('/:moduleId', (req, res, next) => {
//     const id = req.params.moduleId;
//     Moduledata.remove({ _id: id}).exec()
//     .then(result => {
//         res.status(200).json({result});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     });
// }); 

module.exports = router;
