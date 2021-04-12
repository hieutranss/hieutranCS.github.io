const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const cors = require('cors')
const mongodb = require('mongodb')

app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

var output = []

app.get('/', (req, res) => {
res.render(__dirname + '/views/view.ejs',{TEMP : output})
})

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }, (err)=>{
if(err){
console.log("MongoDB disconnected")
}
else{
console.log("MongoDB connected")
}
});

const Schema = mongoose.Schema

const userSchema = new Schema({
username: { type: String, required: true, unique : true }
});

const exerciseSchema = new Schema({
username: { type: String, required: true},
id: { type: String, required: true},
description: { type: String, required: true},
duration: { type: Number, required: true },
date: { type: Date, required: true },
versionKey: false
})

var User = mongoose.model('User', userSchema)

var Exercise = mongoose.model('Exercise', exerciseSchema)

app.post('/api/exercise/new-user', (req, res) =>{
output =[]
var username = req.body.username.replace(/\s+/g, '')

if(username === ""){
output.push("Invalid Username")
res.redirect('/')
}
else{
User.find({ username : username}, ( err, data) =>{
if( data.length > 0){
output.push('User already exists')
res.redirect('/')
}
else{
const new_user = new User({
username : username
})
new_user.save((err, data) => {
if(err){
output.push('Saving Error. Please try again')
res.redirect('/')        }
else{
output =[]
output.push({userID:  data._id  , username:  data.username})
res.redirect('/')
}
})
}
})
}
})

app.post('/api/exercise/add', (req, res) =>{

var id = req.body.id.replace(/\s+/g, '')
var des = req.body.description
var dur = req.body.duration
var date = req.body.date

output =[]
  
if(!date){
var localDate = new Date()
date = localDate.toLocaleString()
}
if(id === ""){
output.push("Invalid ID")
res.redirect('/')
}
else if( dur === ""){
output.push("Invalid duration", "user id: " + id )
res.redirect('/')
}
else if(des === ""){
output.push("Invalid description", "user id: " + id )
res.redirect('/')
}
else if( isNaN(dur)){
output.push("Invalid duration", "user id: " + id)
res.redirect('/')
}
else{
User.findById( { _id : id }, (err, user) =>{
if(err){
output.push("Invalid ID")
res.redirect('/')
}
else{
const new_exercise = new Exercise ({
username : user.username,
id : id,
description : des,
duration : dur,
date: date
})

new_exercise.save((err,data) =>{
if(err){
output.push("Unable to add log to database")
res.redirect('/')
}
else{
output.push({username:  user.username ,userID:   data.id , description:  data.description  , duration:  data.duration + " min" , date:  data.date})
res.redirect('/')
}
})
}
})
}
})

app.post('/api/exercise/users', (req, res) => {
output =[]
if(req.body.displayUser === 'All users'){
User.find({}, (err, users) => { 
if(users.length === 0){
output.push("User not found in database. Please create user")
res.redirect('/')
}
else{
for(var i in users){
output.push({username: users[i].username, userID: users[i]._id  } )
}   
res.redirect('/')
}
})
}
else{
Exercise.find({}, (err, ex) => { 
if(ex.length === 0){
output.push("Exercise logs empty. Please add exercises")
res.redirect('/')
}
else{
for(var i in ex){
output.push({username: ex[i].username, userID: ex[i].id , exercise_id: ex[i]._id , description: ex[i].description , duration: ex[i].duration + " min" , date: ex[i].date  } )
}   
res.redirect('/')
}
})
}
})

app.post('/api/exercise/userdelete', (req, res) => {
var id = req.body.id.replace(/\s+/g, '')
output =[]
if( req.body.deleteAll === "Delete user and logs"){
if(!id){
output.push("Invalid ID")
res.redirect('/')  
}
else{
User.find({_id: (id)}, (err,user) =>{
if(user.length === 0){
output.push("ID not in database")
res.redirect('/')
}
else{        
User.deleteOne( { _id:  (id) }, (err,user)=>{
if(err){
output.push("Unable to delete")
res.redirect('/')
}
})
Exercise.deleteMany( { id:  (id) }, (err,user)=>{
if(err){
output.push("Unable to delete")
res.redirect('/')
}
})
output.push("Deleted successfully")
res.redirect('/')
}
})          
}
}
else{
if(!id){
output.push("Invalid ID")
res.redirect('/')  
}
else{
Exercise.find({_id: (id)}, (err,user) =>{
if(user.length === 0){
output.push("ID not in database")
res.redirect('/')
}
else{
Exercise.remove( { _id:  (id) }, (err,user)=>{
if(err){
output.push("Unable to delete")
res.redirect('/')
}
}) 
output.push("Deleted successfully")
res.redirect('/')
}
})
}
}
})

app.get('/api/exercise/log', (req ,res) =>{
var id = req.query.id.replace(/\s+/g, '')
var from = (req.query.from)         
var to =  (req.query.to)
var limit = Number(req.query.limit);
var log = {}

output = []

if(!id){
output.push("Invalid ID")
res.redirect('/')  
}
else{
User.findById({_id :id} , ( err, user) =>{
if(!user){
output.push("Invalid ID")
res.redirect('/')
}
else{
log.id = user._id

if (from !== "") {
from = new Date(from)
log.date = { $gte: from};
}
else{
log.date = { $gte : 0 }
}
if (to !== "") {
to = new Date(to)
to.setDate(to.getDate() + 1); 
log.date = { $lt: to};
}
else{
var date = new Date()
log.date ={$lt : date.toLocaleString()}
}
Exercise.find(log,{_id:0 , __v:0}).limit(limit).then(exe =>{
if (exe.length === 0){
output.push("User's exercise not found in database. Please submit exercises before viewing log")
res.redirect('/')
}
else{
for(var i in exe){
output.push({username: exe[i].username, userID: exe[i].id ,description: exe[i].description ,duration: exe[i].duration + " min",date:  new Date(exe[i].date).toUTCString() } )
}
res.redirect('/')
}
})
}
})
}
})


app.use((req, res, next) => {
return next({status: 404, message: 'URL Not Found'})
})

app.use((err, req, res, next) => {
let errCode, errMessage

if (err.errors) {
errCode = 400 
const keys = Object.keys(err.errors)
errMessage = err.errors[keys[0]].message
} else {
errCode = err.status || 500
errMessage = err.message || 'Internal Server Error'
}
res.status(errCode).type('txt')
.send(errMessage)
})


const listener = app.listen(process.env.PORT || 3000, () => {
console.log('Your app is listening on port ' + listener.address().port)
})