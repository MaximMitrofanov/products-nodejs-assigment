const express = require('express');
const router = express.Router();

/* GET users listing. */
idcounter = 0;
users = [
  { id: idcounter++, name: 'Max', age: '22', perms: 'root' },
  { id: idcounter++, name: 'Vitaly', age: '24', perms: 'm' },
  { id: idcounter++, name: 'House', age: '22', perms: 'a' },
  { id: idcounter++, name: 'Mungus', age: '22', perms: 'z' },
]

router.get('/', function (req, res, next) {
  res.json(users);
});

router.get('/:id', function (req, res, next) {
  const response = users.find(c => c.id === parseInt(req.params.id));
  if (!response) return res.status(404).send("Couldn't find user");
  res.json(response);
});

router.post('/', function (req, res, next) {
  const new_user = {
    id: idcounter++,
    name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
    age: req.body.age,
    perms: req.body.perms,
  }
  users.push(new_user);
  res.end('Added user');
});

router.put('/:id', function (req, res, next) {
  const response = users.find(c => c.id === parseInt(req.params.id));
  if (!response) return res.status(404).send("Couldn't find user");

  req.body.name.length != undefined ? response.name = (req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)) : null;
  req.body.age != undefined ? response.age = req.body.age : null;
  req.body.perms != undefined ? response.perms = req.body.perms : null;

  res.send("Edited user\n" + `id: ${response.id}`);
});

router.delete('/:id', function (req, res, next) {
  const response = users.find(c => c.id === parseInt(req.params.id));
  if (!response) return res.status(404).send("Couldn't find user");
  const index = users.indexOf(response);
  users.splice(index, 1);
  res.send('User deleted\n' + `id: ${response.id}`);
});


module.exports = router;
