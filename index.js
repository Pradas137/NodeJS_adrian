var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
var users = {
"paco":"noni":"paco@gmail.com",
"oscar": "noni" : "oscar@gmail.com",
};
//Mostrar Formulario
app.get('/login', function (req, res) {
  res.render('loginform');
});
//procesos input de l'usario
app.post('/login',function(req, res){
	var user ="";
	var inputUser = req.body.username;
	if (inputUser in users){
		if(req.body.password == users[inputUser]) {
			user = inputUser;
		}
	}
	res.render('loginformPost', {user:user});
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', authenticationHelpers.isNotAuthOrRedirect, function(request, response, next) {
 registerUserController(request.body).then(function(user) {
  response.json(user);
 }).catch(function(error) {
  console.log(error);
  response.status(400).json({"reason": error.message});
 });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});