const express = require("express");
const cors = require('cors');
const fs = require("fs");
const app = express();
const PORT = 5500;
app.listen(PORT, () => {});

app.use(cors());
app.use(express.json());
app.use(express.static('front-end'));

// app.use(cors({origin:'*'}));
// app.use(express.static('front-end'))

const readUser = () => {
  const users = fs.readFileSync("users.json", "utf8");
  return JSON.parse(users);
};

const save = (users) => {
  const addUser = JSON.stringify(users);
  console.log(addUser);
  fs.writeFileSync("users.json", addUser);
  return addUser;
};

const users = readUser();

app.get("/users", (req, res) => {
  res.send({ status: 200, massage: "successful", data: users });
});

app.post("/users", (req, res) => {
  const newID = users.length ? users[users.length - 1].id + 1 : 1;
  const newName = req.body.name;
  const newEmail = req.body.email;

  const newUser = { id: newID, name: newName, email: newEmail };
  if (newName == "" || !newName) {
    return res.send({ massage: "Please enter a name" });
  } else if (newEmail == "" || !newEmail) {
    return res.send({ massage: "Please enter a email" });
  } else {
    users.push(newUser);
    save(users);

    return res.send({ status: 200, massge: "successful", data: users });
  }
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
  
    let index = -1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        index = i;
      }
    }
    if (index >= 0) {
      const user = users[index];
      user.name = name;
      user.email = email;
  
      save(users); // Save the updated users to the file
  
      console.log(users);
      return res.send({ data: users });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  });

app.delete("/users/:id", (req, res) => {
    // const users = readUser();
    let id = req.params.id;
    let index = users.findIndex(user => user.id == id);
    console.log(index);
    if(index>= 0){
        users.splice(index, 1);
        save(users)
        return res.send({ status: 200, massge: "successful"});
    }
    else{
        return res.send({ status: 404, massge: "Not found"})
    }
})

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
  
    if (user) {
      res.send({ data: user });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  });
  