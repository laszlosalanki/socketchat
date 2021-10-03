db = db.getSiblingDB('admin');
let init = [
  db.createUser({user:"root",pwd:"root",roles:[{role:"readWrite",db:"socketchat"}]}),
];
