var express = require('express'),
    fs = require('fs'),
    app = express(),
    server = app.listen(3000, function() {console.log("Listening ...")}),
    storeFile = './userslist.json',
    data = fs.readFileSync(storeFile),
    users = JSON.parse(data);
    
app.use(express.static('public'));
    
app.get('/api/employee', function(request, response) {response.send(users)});
app.get('/api/addemployee/:username/:userrole', addUser);
app.get('/api/updateemployee/:username/:userrole/:userid', updateUser);
app.get('/api/deleteemployee/:userid', deleteUser);
    
function addUser(request, response) {
    var newUserId = users.length ? users[users.length-1].id + 1 : 1;
    users.push({id: newUserId, name: request.params.username, role: request.params.userrole});
    saveData();
}

function updateUser(request, response) {
    function findId(element) {
        return element.id == request.params.userid;
    }
    users[users.findIndex(findId)].name = request.params.username;
    users[users.findIndex(findId)].role = request.params.userrole;
    saveData();
}

function deleteUser(request, response) {
    function findId(element) {
        return element.id == request.params.userid;
    }
    users.splice(users.findIndex(findId), 1);
    saveData();
}

function saveData() {
    var data = JSON.stringify(users, null, 2);
    fs.writeFile(storeFile, data, function (err) { 
        if (err) {
            res.status(500).jsonp({ error: 'Failed to write file' });
         }
         res.send("File write success");
    });
}
