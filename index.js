// (status codes{
//     1xx-->information 
//     2xx-->success
//     3xx-->redirections
//     4xx-->erros
// }
const dataservice = require('./services/data.service');
const express=require('express');
const app=express();
const session=require('express-session');

app.use(express.json())

app.use(session({
    secret:"randomsecurestring",
    resave:false,
    saveUninitialized:false
}))

// const logmiddleware = (req,res,next)=>{   |
//     console.log(req.body);                |
// next()                                    |---------->how to create a middleware
// }                                         |
// app.use(logmiddleware);                   |

const authenticationMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
            status: false,
            statusCode: 422,
            message: "you must login first",
        })
    }
    else{
        next()
    }
}

app.get('/',(req,res)=>{
    res.status(401).send("this is getting blah blah blah")
})



app.post('/',(req,res)=>{
    res.send("this is posting")
})


app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.accno, req.body.name, req.body.password)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));

})


app.post('/login', (req, res) => {
    // console.log(req.body);
    const result = dataservice.login(req,req.body.accno, req.body.password)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})


app.post('/deposit',authenticationMiddleware, (req, res) => {
    // console.log(req.body);
    const result = dataservice.deposit(req.body.accno, req.body.password,req.body.amnt)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})


app.post('/widraw',authenticationMiddleware, (req, res) => {
    // console.log(req.body);
    const result = dataservice.widraw(req.body.accno, req.body.password,req.body.amnt)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})




app.put('/',(req,res)=>{
    res.send("this is putting")
})


app.patch('/',(req,res)=>{
    res.send("this is patching")
})


app.delete('/',(req,res)=>{
    res.send("this is deleting")
})


app.copy('/',(req,res)=>{
    res.send("this is copy")
})


app.listen(3000,()=>{
    console.log("server started at 3000");
})

