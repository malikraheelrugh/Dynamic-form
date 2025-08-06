userData = [
  { label: "name", type: "text", isRequired: true },
  { label: "user", type: "text", isRequired: false },
  { label: "phone", type: "number", isRequired: false },
  { label: "email", type: "email", isRequired: true },
  { label: "password", type: "password", isRequired: true },
];
//make form and append to body
let form = document.createElement("form");
form.setAttribute("action", "/");
document.body.append(form);
//heading
let h1 = document.createElement("h1");
h1.innerHTML = "Dynamic form";
form.appendChild(h1);
userData.forEach((item) => {
  //create main div
  let maindiv = document.createElement("div");
  maindiv.setAttribute("class", "main-div");
  form.append(maindiv);

  //create label and input
  let label = document.createElement("label");
  label.textContent = item.label;
  // Add star only if isRequired is true
  if (item.isRequired) {
    const star = document.createElement("span");
    star.setAttribute("class", "star");
    star.textContent = " *";
    label.appendChild(star);
  }
  let input = document.createElement("input");
  input.setAttribute("type", item.type);
  input.setAttribute("id", item.label);
  input.setAttribute("placeholder", `Enter ${item.label}`);
  maindiv.append(label);
  maindiv.append(input);

  if (item.isRequired) {
    let error = document.createElement("small");
    error.innerHTML = `please fill in the ${item.label}`;
    error.style.color = "red";
    error.style.visibility = "hidden";
    maindiv.appendChild(error);
  }
});
//create checkbox div
let checkboxDiv = document.createElement("div");
checkboxDiv.style.marginTop = "1.5rem";
form.append(checkboxDiv);
//create submit btn
let submitBtn = document.createElement("button");
submitBtn.innerHTML = "Submit";
submitBtn.setAttribute("id", "btn");
submitBtn.setAttribute("type", "button");
form.append(submitBtn);
//show output on the document
const output1 = document.createElement("div");
output1.setAttribute("id", "output");
document.body.append(output1);

//access all items by ids
const showOutput = document.querySelector("#output");
const Dform = document.querySelector("form");
const span = document.querySelector("span");
const btn = document.querySelector("#btn");

//take output from input fields
btn.addEventListener("click", () => {
  validateForm();
});
let users = [];
let currentIndex = null;
function validateForm() {
  let small = document.querySelectorAll("small");

  userData.forEach((item) => {
    let inputValue = document.getElementById(item.label);
    let finalVal = inputValue.value;

    if ((item.isRequired, finalVal != "")) {
      if (!item.isRequired && finalVal != "") {
        small.forEach((item) => {
          item.style.visibility = "visible";
        });
        return false;
      } else {
        small.forEach((item) => {
          item.style.visibility = "hidden";
        });
      }
      submitCall();
    }
  });
}

function submitCall() {
  let user = {};

  userData.forEach((item) => {
    let inputValue = document.getElementById(item.label);
    let finalVal = inputValue.value;
    user[item.label] = finalVal;
    console.log(finalVal);
  });
  if (currentIndex != null) {
    users[currentIndex] = user;
    updateUi();
    currentIndex = null;
  } else {
    users.push(user);
  }
  console.log(users);
  updateUi();

  Dform.reset();
}

function updateUi() {
  let output = "";
  output += `<table border="4" style="width:100%;">`;
  userData.forEach((data) => {
    output += `<th style="color:rgb(163, 246, 174)">${data.label}</th>`;
  });
  output += `<th >Action</th><tbody>`;
  users.forEach((user, index) => {
    // output += `<div>`;
    output += `<tr>`;
    userData.forEach((data) => {
      output += `<td> ${user[data.label]}</td>`;
    });
    output += `<td><button onclick="editMe(${index})">edit</button>`;
    output += `<button onclick="deleteMe(${index})">delete</button></td>`;
  });
  output += `</tr><br></tbody></table>`;
  btn.innerHTML = "submit";

  showOutput.innerHTML = output;
}

function deleteMe(index) {
  console.log(index);
  users.splice(index, 1);
  updateUi();
}

function editMe(index) {
  btn.innerHTML = "update";
  console.log(index);
  userData.forEach((item) => {
    document.getElementById(item.label).value = users[index][item.label];
  });
  currentIndex = index;
}
