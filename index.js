const express = require('express');


const app = express();

let values = {};
let popularity={};

app.use(express.json());

app.get('/values',(req,res)=>{
    return res.json(values);
})
app.get('/value',(req,res)=>{

    let key = Object.keys(req.query);
    //set the key popularity
    if(popularity[key[0]]>0) {
        popularity[key[0]] +=1;
    }
    else {
        popularity[key[0]] = 1;
    }

    if(!values[key]) {

            // get the values current length
        let length = Object.keys(values).length;
        if(length < 4) {
            values = {
                ...values,
                [key[0]]:req.query[key[0]]
            }
        }


        else if( length > 4 || length === 4 ) {
            
            let entries  =  Object.entries(popularity);


            let sortedEntries = entries.sort((a,b)=>{
                return a[1]-b[1];
            });

            let keyToDelete = sortedEntries.length > 3 && sortedEntries[0][0]=== key[0] ?sortedEntries[1][0]:sortedEntries[0][0];
            
            delete values[keyToDelete];
            delete popularity[keyToDelete];
    
            values = {
                ...values,
                [key[0]]:req.query[key[0]]
            }
        }
    }

    let returnObject = {
        [key]: values[key]
    }
    
    return res.json(returnObject);
});
app.get('/',(req,res)=>res.json('hello'));


app.listen(3000,()=>{
    console.log('server is running...')
})