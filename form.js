userData = [
  {
    label: "name",
    type: "text",
    isRequired: true,
    validationtype: /^[A-Za-z]+$/,
  },
  {
    label: "user",
    type: "text",
    isRequired: true,
    validationtype: /^[a-zA-Z]/,
  },
  {
    label: "phone",
    type: "phone",
    isRequired: true,
    validationtype: /^((\+92|0092|0)?3\d{2}-?\d{7}|03\d{2}-?\d{7})$/,
  },
  {
    label: "email",
    type: "email",
    isRequired: true,
    validationtype: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  {
    label: "password",
    type: "password",
    isRequired: true,
    validationtype: /^.{8}$/,
  },
  {
    label: "gender",
    type: "radio",
    isRequired: false,
    validationtype: "string",
    Options: ["Male", "female", "unknown"],
  },
  {
    label: "checkbox",
    type: "checkbox",
    isRequired: false,
    validationtype: "",
  },
  {
    label: "websiteURL",
    type: "text",
    isRequired: false,
    validationtype:
      "^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\. ]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$",
  },
];
//make form and append to body
let form = document.createElement("form");
form.setAttribute("action", "/");
document.body.append(form);
let localstore = document.createElement("h4");
localstore.setAttribute("id", "local-storage");
document.body.append(localstore);
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
    const star = document.createElement("small");
    star.setAttribute("class", "star");
    star.textContent = " * ";
    label.appendChild(star);
  }
  let input = document.createElement("input");
  input.setAttribute("type", item.type);
  input.setAttribute("id", item.label);
  input.setAttribute("placeholder", `Enter ${item.label}`);
  maindiv.append(label);
  maindiv.append(input);
  if (item.isRequired) {
    let span = document.createElement("p");
    span.innerHTML = `${item.label} is required`;
    span.style.visibility = "hidden";
    span.setAttribute("id", `span${item.label}`);
    maindiv.appendChild(span);
  }
  if (item.type == "radio") {
    input.remove();
    let gender = document.createElement("div");
    item.Options.forEach((option) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = item.label;
      radioInput.value = option;
      radioInput.id = `${item.label}`;
      const radioLabel = document.createElement("label");
      radioLabel.setAttribute("for", radioInput.id);
      radioLabel.style.fontSize = "14px";
      radioLabel.style.color = "black";
      let error = document.createElement("small");
      error.setAttribute("class", item.label);
      maindiv.appendChild(error);

      radioLabel.textContent = option;
      gender.appendChild(radioInput);
      gender.appendChild(radioLabel);
    });
    maindiv.appendChild(gender);
  }
  if (item.type == "checkbox") {
    let checkboxDiv = document.createElement("div");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", item.label);
    let label = document.createElement("label");
    label.setAttribute("for", item.label);
    label.innerHTML = "I agree to the terms and conditions<br>";
    label.style.fontSize = "17px";
    label.style.color = "black";
    let error = document.createElement("small");
    error.setAttribute("class", item.label);
    error.innerHTML = "checkbox must be checked";
    maindiv.appendChild(checkboxDiv);
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    checkboxDiv.appendChild(error);
  }
  if (item.isRequired) {
    let error = document.createElement("small");
    error.setAttribute("class", item.label);
    // error.innerHTML = `please enter a valid ${item.label}`;
    error.style.color = "red";
    // error.style.visibility = "hidden";
    maindiv.appendChild(error);
  }
});
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
// Show last saved user data on page load
// const savedUsers = JSON.parse(localStorage.getItem("user")) || [];
// if (savedUsers.length > 0) {
//   output1.innerHTML = `<pre>${JSON.stringify(savedUsers, null, 2)}</pre>`;
// }

//access all items by ids
const Dform = document.querySelector("form");
const btn = document.querySelector("#btn");
const radioInputs = document.querySelectorAll("#gender");
const small = document.querySelectorAll("small");
const showOutput = document.querySelector("#output");
let localstor = document.querySelector("#local-storage");
// Show last saved user data on page load

//show error on when use r focus on input
function focusInput() {
  userData.forEach((item) => {
    let input = document.getElementById(`${item.label}`);
    input.addEventListener("focus", (e) => {
      if (item.isRequired) {
        document.getElementById(`span${item.label}`).style.visibility =
          "visible";
      }
    });
  });
  console.log("focus function");
  input();
}
focusInput();
//remove required error and show validation error
let validationStatus = {};
function input() {
  userData.forEach((item) => {
    let input = document.getElementById(`${item.label}`);
    let valid = item.validationtype;
    input.addEventListener("input", (e) => {
      let validError = document.querySelector(`.${item.label}`);
      if (item.isRequired) {
        document.getElementById(`span${item.label}`).innerHTML = "";
        let value = input.value;
        if (value.length > 0) {
          if (!value.match(valid)) {
            validError.style.color = "red";
            validError.innerHTML = `please enter a valid ${item.label}`;
            input.style.border = "2px solid red";

            validationStatus[item.label] = false;
          } else {
            validError.textContent = `you ${item.label} is valid`;
            validError.style.color = "green";
            input.style.border = "2px solid green";
            validationStatus[item.label] = true;
          }
        } else {
          document.getElementById(
            `span${item.label}`
          ).innerHTML = `${item.label} is required`;
          validError.textContent = "";
        }
      }
    });
  });
}
let users = [];
let currentIndex = null;
btn.addEventListener("click", () => {
  validate();
  localStorage.setItem("user", JSON.stringify(users));
  JSON.parse(localStorage.getItem("user"));
  renderUsers();
});
function validate() {
  // if (
  //   validationStatus.name != true ||
  //   validationStatus.user != true ||
  //   validationStatus.phone != true ||
  //   validationStatus.email != true ||
  //   validationStatus.password != true
  // ) {
  //   console.log("form can not be submitted");
  // } else {
  submitCall();

  Dform.reset();
  small.forEach((error) => {
    error.innerHTML = "";
  });
  userData.forEach((item) => {
    const el = document.getElementById(`${item.label}`);
    if (el) el.style.border = "none";
  });
  // }
}
document.getElementById("checkbox").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.querySelector(".checkbox").style.visibility = "hidden";
  } else {
    document.querySelector(".checkbox").style.visibility = "visible";
  }
});
function submitCall() {
  let user = {};

  userData.forEach((item) => {
    let inputValue = document.getElementById(item.label);
    let finalVal = inputValue.value;
    user[item.label] = finalVal;
  });
  if (currentIndex != null) {
    users[currentIndex] = user;
    // updateUi();
    currentIndex = null;
  } else {
    users.push(user);
  }
  console.log(users);
  // updateUi();
  btn.innerHTML = "Submit";
}
// function updateUi() {
//   let output = "";
//   output += `<table border="4" style="width:100%;">`;
//   userData.forEach((data) => {
//     output += `<th style="color:rgb(163, 246, 174)">${data.label}</th>`;
//   });
//   output += `<th >Action</th><tbody>`;
//   users.forEach((user, index) => {
//     // output += `<div>`;
//     output += `<tr>`;
//     userData.forEach((data) => {
//       output += `<td> ${user[data.label]}</td>`;
//     });
//     output += `<td><button onclick="editMe(${index})">edit</button>`;
//     output += `<button onclick="deleteMe(${index})">delete</button></td>`;
//   });
//   output += `</tr><br></tbody></table>`;
//   btn.innerHTML = "submit";

//   showOutput.innerHTML = output;
// }
function renderUsers() {
  // Load users from localStorage if available
  const savedUsers = JSON.parse(localStorage.getItem("user")) || [];
  if (savedUsers.length > 0) {
    users = savedUsers;
  }
  localstor.innerHTML = users
    .map(
      (user, index) =>
        ` ${user.name} , ${user.user}, ${user.phone},
       ${user.email}, ${user.password}, ${user.websiteURL}
       <button onclick="editMe(${index})">edit</button>
       <button onclick="deleteMe(${index})">delete</button><br>`
    )
    .join("");
}
renderUsers();
function editMe(index) {
  currentIndex = index;
  let user = users[index];
  userData.forEach((item) => {
    let input = document.getElementById(`${item.label}`);
    if (input) {
      input.value = user[item.label] || "";
    }
  });
  btn.innerHTML = "Update";
}
function deleteMe(index) {
  users.splice(index, 1);
  localStorage.setItem("user", JSON.stringify(users));
  renderUsers();
}
