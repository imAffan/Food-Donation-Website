const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const cp = require('cookie-parser');

 
const item = require('./models/food');
const banner = require('./models/Banner'); 
const { ssn } = require('inspector');
mongoose.connect('mongodb://localhost:27017/foodbank', {
     
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


/////////////////////

////////////////////
 
app.use(session({secret:"Its A secret!!!"}));

 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
 
app.use((req,res,next)=>
{
    res.locals.s = req.session.count;
    next();
})

app.get('/', async (req, res) => {
      
    if (req.session.count)
    {
        req.session.count+=1;
        
        
    }
    else
    {
        req.session.count=1;
        
        
    }
      
     const items = await item.find({})
     res.render('home', { items });
    
 
})

 app.post('/Addtocart', async (req, res) => {
     
    const qty=req.body.qty;
    req.session.qty=qty;
    res.send("hi")
     

    console.log(req.body)
    
})

 
 
////////////////////////////////////



app.get('/crud/bannerhome', async (req, res) => {
    const food= await banner.find({})
     res.render('crud/bannerhome', {food });
     
     
})


////////////////////////////////


app.get('/crud/new', async (req, res) => {
     
    res.render('crud/new');
});


app.get('/stock', async (req, res) => {
     
    res.render('crud/stock');
});



app.post('/adminhome',  async (req, res ) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const food = new item(req.body.food);
    await food.save();
    console.log(req.body.food)
    res.redirect(`/crud/${food._id}`)
})




app.get('/adminhome', async (req, res) => {
    const items = await item.find({})
    res.render('adminhome', { items });
    
})
          


app.get('/login', async (req, res) => {
     
    res.render('login');
})

 


app.get('/home/login', async (req, res) => {

    const items = await item.find({})
    res.render('adminhome', { items });
    console.log(req.body.admin)
    
})


app.get('/crud/:id', async (req, res,) => {
    const food= await item.findById(req.params.id)
    res.render('crud/show', { food});
    
});

app.get('/crud/:id/edit', async (req, res) => {
    const food= await item.findById(req.params.id)
    res.render('crud/edit', {food });
})





app.put('/crud/:id', async (req, res) => {
    const { id } = req.params;
    const food= await item.findByIdAndUpdate(id, { ...req.body.food});
    console.log(req.body.food)
    res.redirect(`/crud/${food._id}`)
});






///////////////////////////

app.get('/crud/bannerhome', async (req, res) => {
    const food= await banner.find({})
     res.render('crud/bannerhome', {food });
     
     
})



///////////////////
app.listen(7000, () => {
    console.log('Serving on port 7000')
})

