const input = document.getElementById("urlInput");
const nameInput = document.getElementById("nameInput");
const btn = document.getElementById("addBtn");

let links = [];
let urlValidation =
  /^(http)[s]?(:\/\/)[a-zA-Z0-9]+[.\/@#?]?[a-zA-Z0-9]{2,}[\/@#.=]+?[a-zA-Z0-9]+?/gm;
if (localStorage.getItem("bookmarkes") != null) {
  links = JSON.parse(localStorage.getItem("bookmarkes"));
  paintUi(links);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addBtn();
});

function addBtn() {
  if (urlValidation.test(input.value)) {
    let urlObj = {
      url: input.value,
      name: nameInput.value,
    };
    if (links.length != 0) {
      for (let i = 0; i < links.length; i++) {
        if (links[i].name == nameInput.value) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This Site Name Has Been Already Founded.",
          });
          break;
        } else {
          links.push(urlObj);
          localStorage.setItem("bookmarkes", JSON.stringify(links));
          clearForm();

          paintUi(links);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Bookmark Added Successfully.",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          break;
        }
      }
    } else {
      links.push(urlObj);
      localStorage.setItem("bookmarkes", JSON.stringify(links));
      clearForm();
      paintUi(links);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bookmark Added Successfully.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Url Pls Insert Valid Url",
    });
  }
}

function paintUi(linksList) {
  let tags = ``;
  for (let i = 0; i < links.length; i++) {
    tags += `<div class="box">
    <div class='btns'>
        <a href=${linksList[i].url} target="_blank" class="abtn">Viste</a>
        <button class="abtn" onclick='deleteHandler(${i})'>Delete</button>
        </div>
        <span>${linksList[i].name}</span>
      </div>`;
  }
  document.querySelector(".content").innerHTML = tags;
}

function deleteHandler(index) {
  links.splice(index, 1);
  localStorage.setItem("bookmarkes", JSON.stringify(links));
  paintUi(links);
}

function clearForm() {
  input.value = "";
  nameInput.value = "";
}
