require('dotenv').config({path: '.env'});
const express =  require('express');
const  mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');


const app = express();
const note = require('./models/note')
const notesRouter = require('./routes/notes')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));


app.get('/', async (req, res) =>{
    const notes = await note.find().sort('-createdAt');
    res.render('index', {notes: notes});
});

mongoose.connect(process.env.SERVER,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, ()=> {
    console.log('server started at port 3000');
    
});




