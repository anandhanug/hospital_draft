const express = require("express");
const fs = require("fs");

const app = new express();

app.use(express.json());

const hospitals = require("./hospitals.json");


// GET method - Reading the list of Hospitals

app.get("/hospitals",(req,res)=>{
   
        fs.readFile("hospitals.json",hospitals,(err)=>{
        if(err){
            console.log("reading failed");
            res.send("reading failed")
        }
        else{
            console.log("read successfully");
            res.send(hospitals)
        }
    }
        )
});

app.listen(3200);



// POST method- Adding a new hospital data

app.post("/hospitals",(req,res)=>{

    hospitals.push(req.body);

    fs.writeFile("hospitals.json",JSON.stringify(hospitals),(err)=>{

        //debug code
        if(err){
            console.log("writing failed");
            res.send("writing failed")
        }
        else{
            console.log("written successfully");
            res.send("written successfully")
        }
    })
});


//PUT method - Updating a data (Patient count)

app.put("/hospitals/:name",(req,res)=>{

    let name = req.params.name;
    hospitals.forEach((hospital)=>{
        if(hospital.Hospitalname==name){
                        
            hospital.Patientcount=req.body.Patientcount;
        }
    })
    fs.writeFile("hospitals.json",JSON.stringify(hospitals),(err)=>{
        if(err){
            console.log("Data updation failed")
        }
        else{
            console.log("Data updated successfully");
            res.send(hospitals);
        }
    })
});


//DELETE method - Deleting a data

app.delete("/hospitals/:name", (req,res)=>{
    let name = req.params.name;
   
    let result = hospitals.filter(n=>n.Hospitalname!=name);  
        
    
    fs.writeFile("hospitals.json",JSON.stringify(result),(err)=>{
        if(err){
            console.log("Data deletion failed");
        }
        else{
            console.log("Data deleted successfully");
            res.send(hospitals);
        }
    })
});