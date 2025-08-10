userData = [
  {
    label: "name",
    type: "text",
    isRequired: true,
    validationtype: /^[a-zA-Z]/,
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
  if (item.type != "checkbox" && item.type != "radio") {
    let error = document.createElement("small");
    error.setAttribute("class", item.label);
    error.innerHTML = `please enter a valid ${item.label}`;
    error.style.color = "red";
    error.style.visibility = "hidden";
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

//access all items by ids
const showOutput = document.querySelector("#output");
const Dform = document.querySelector("form");
const btn = document.querySelector("#btn");
const myName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const inputs = document.querySelectorAll("input");
const radioInputs = document.querySelectorAll("#gender");

let radio = Array.from(radioInputs);
radio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    document.querySelector(".gender").style.visibility = "hidden";
  });
});
console.log(submitBtn);

//add event listener to submit button
btn.addEventListener("click", () => {
  console.log(validationStatus);
  // refreshPage();
  // required();
  validate();
  // error();
});
function validate() {
  if (
    validationStatus.name == true &&
    validationStatus.user == true &&
    validationStatus.phone == true &&
    validationStatus.email == true &&
    validationStatus.password == true
  ) {
    alert("form submitted successfully");
    submitCall();
  }
}
let users = [];
let currentIndex = null;

function submitCall() {
  let user = {};

  userData.forEach((item) => {
    let inputValue = document.getElementById(item.label);
    let finalVal = inputValue.value;
    user[item.label] = finalVal;
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
function error() {
  let small = document.querySelectorAll("small");
  small.forEach((item) => {
    console.log(item);

    item.style.visibility = "visible";
  });
}
//strong validation using validatetype
let validationStatus = {};
function validatetype() {
  userData.forEach((item) => {
    let isValid = item.validationtype;
    let input = document.getElementById(item.label);

    input.addEventListener("input", () => {
      let value = input.value;
      if (item.type != "radio" && item.type != "checkbox") {
        if (!value.match(isValid)) {
          document.querySelector(
            `.${item.label}`
          ).innerHTML = `please enter a valid ${item.label}`;
          document.querySelector(`.${item.label}`).style.color = "red";

          document.querySelector(`.${item.label}`).style.visibility = "visible";

          validationStatus[item.label] = false;
        } else {
          document.querySelector(
            `.${item.label}`
          ).textContent = `your ${item.label} is valid`;
          document.querySelector(`.${item.label}`).style.color = "green";
          document.querySelector(`#${item.label}`).style.border =
            "2px solid green";
          validationStatus[item.label] = true;
        }
      }
    });
  });
}
validatetype();

document.getElementById("checkbox").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.querySelector(".checkbox").style.visibility = "hidden";
  } else {
    document.querySelector(".checkbox").style.visibility = "visible";
  }
});
function refreshPage() {
  userData.forEach((item) => {
    document.querySelector(
      `.${item.label}`
    ).innerHTML = `please enter a valid ${item.label}`;
    document.querySelector(`.${item.label}`).style.color = "red";
    document.querySelector(`.${item.label}`).style.visibility = "hidden";
    document.querySelector(`#${item.label}`).style.border = "2px solid red";
  });
  document.querySelector(".password").innerHTML =
    "Password must be at least 8 characters long ";
  document.querySelector(".gender").innerHTML = "Please select gender";
  document.querySelector(".checkbox").innerHTML = "checkbox must be checked";
}
document.querySelector(".password").innerHTML =
  "Password must be at least 8 characters long ";
document.querySelector(".gender").innerHTML = "Please select gender";
document.querySelector(".checkbox").innerHTML = "checkbox must be checked";

// refreshPage();
function required() {
  userData.forEach((item) => {
    const input = document.getElementById(`${item.label}`);

    if (item.isRequired) {
      // if (input.type != "checkbox" && input.type != "radio") {
      input.addEventListener("focus", (e) => {
        document.querySelector(`.${item.label}`).style.visibility = "visible";
        document.querySelector(`#span${item.label}`).innerHTML = "";
      });
      // }
    }
  });
}
required();
