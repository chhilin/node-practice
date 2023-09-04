
const name = document.getElementById('name');
const email = document.getElementById('email');
const checkbox = document.getElementById('check-input');
const IP = "localhost";
const PORT = 5500;
let HTTP_REQUEST_USER = 'http://localhost:5500/users'; // Replace with your server's URL

const contain = document.querySelector('#contain');
function displayUsers(response) {
    let users = response.data.data;
    
    for (let user of users){
       
        const card = document.createElement('div');
        let card_body = document.createElement('div');
        let left = document.createElement('div');
        let right = document.createElement('div');
       

        left.className = 'contain-left';
        right.className = 'contain-right';

        card.className = 'card';
        card_body.className = 'card-body';
        

        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let btn_edit = document.createElement('button');
        let btn_delete = document.createElement('button');
        btn_edit.className = 'btn-edit';
        btn_delete.className = 'btn-delete';

        p1.textContent = 'ID: ' + user.id;
        p2.textContent = 'User: ' + user.name;
        p3.textContent = 'Email: ' + user.email;

        btn_edit.textContent = 'Edit';
        btn_delete.textContent = 'Delete';
        btn_delete.addEventListener('click', () => deleteUser(user.id));
        

        left.appendChild(p1);
        left.appendChild(p2);
        left.appendChild(p3);

        right.appendChild(btn_edit);
        right.appendChild(btn_delete);

        card_body.appendChild(left);
        card_body.appendChild(right);

        card.appendChild(card_body);
        contain.appendChild(card)

    }
}

let getUsers = () => {
    axios.get(HTTP_REQUEST_USER)
      .then(displayUsers)
      .catch((err) => console.log(err));
  };

let addUsers = (e) => {
  let newUser = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
  }
  axios.post(HTTP_REQUEST_USER, newUser)
  .then(response =>{})
}
let deleteUser = (id) => {
  let HTTP_REQUEST_USER = `http://localhost:5500/users/${id}`;
  axios.delete(HTTP_REQUEST_USER)
  .then(response=>{
    location.reload();
    ;})
}

getUsers();

