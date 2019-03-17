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
    .select('moduleID mappedTo type status')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            modules: docs.map(doc => {
                return {
                    moduleID: doc.moduleID,
                    id: doc._id,
                    mappedTo: doc.mappedTo,
                    type: doc.type,
                    status: doc.status,
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


router.get('/espmodule', (req, res, next) => {   
    Esp8266one.find()
    .sort({$natural: -1})
    .limit(1)
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            modules: docs.map(doc => {
                return {
                    moduleID: doc.moduleID,
                    id: doc._id,
                    mappedTo: doc.mappedTo,
                    value: doc.value,
                    datetime: doc.datetime,
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


router.get('/esp', (req, res, next) => {   
    Esp8266one.find()
    .select('moduleID mappedTo value datetime')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            modules: docs.map(doc => {
                return {
                    moduleID: doc.moduleID,
                    id: doc._id,
                    mappedTo: doc.mappedTo,
                    value: doc.value,
                    datetime: doc.datetime,
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


router.get('/insert', (req, res, next) => {
    var currentdate = new Date(); 
    var dtime =  currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getDate()  + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    const esp8266one = new Esp8266one({
        _id: new mongoose.Types.ObjectId(),
        moduleID: req.query.moduleID,
        mappedTo: req.query.mappedTo,
        value: req.query.value,
        datetime: dtime
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
                datetime: result.datetime,
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
    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getDate()  + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    const modulesoverflow = new Modulesoverflow({
        _id: new mongoose.Types.ObjectId(),
        moduleID: req.body.moduleID,
        time: datetime,
        value: req.body.value,
        lat: req.body.lat,
        lng: req.body.lng
    });
    modulesoverflow.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Created module",
            modules : {
                moduleID: result.moduleID,
                time: datetime,
                value: result.value,
                lat: result.lat,
                lng: result.lng,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/modules/' + result._id
                }
            }
        });
        // var string = encodeURIComponent('1');
        // res.redirect('/map/?val=' + string);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    var lat = req.body.lat;
    var lng = req.body.lng;
    var overflowvalue = req.body.value;
    if(overflowvalue<=15){
        const accountSid = 'AC66dead53c973552acb3620dce467cdb9';
        const authToken = 'c45a57ff20582c121a6bd1a2f2df7673';
        const client = require('twilio')(accountSid, authToken);
        client.messages
        .create({
            body: 'There is a Sewage overflow at https://www.google.com/maps/search/?api=1&query='+lat+','+lng ,
            from: '+15312081934',
            to: '+918686427332'
        })
        .then(message => console.log(message.sid));
    }
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
