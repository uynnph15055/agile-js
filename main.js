const columns = document.querySelectorAll(".content__column-content");
const form = document.querySelector(".form");
const jobContent = document.querySelector(".form__control--input");
const boxResults = document.querySelector(".content__column-content");
const boxDelete = document.querySelector(".content__feture-delete");
const total = document.querySelector(".content__column-total");
let targets;

let arrJobs = [];
var currentTarget = null;


const renderJobs = (arr) => {
  boxResults.innerHTML = arr
    .map((item, index) => {
      return `
            <div index="${index}" class="content__job-item" draggable="true">
                <p class="content__job-item--intro">${item}</p>
                <div class="content__job-type">
                    <span class="content__job--status"><i class="fa-sharp fa-solid fa-circle-exclamation content__job--status-error"></i></span>
                    <img class="content__job--user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3LHAqu3R8nTvnqI6sP5yHWJla6XY8rgTuQ&usqp=CAU" alt="">
                 </div>
            </div>
            `;
    })
    .join(" ");
    total.innerText = `Tổng số : ${arr.length} công việc`
};

const jobsLocal = JSON.parse(localStorage.getItem("jobs"));
if (jobsLocal) {
  arrJobs = jobsLocal;
  renderJobs(arrJobs);
  resetTarget();
}

boxDelete.addEventListener("dragover", function (e) {
  e.preventDefault();
});

boxDelete.addEventListener("drop", function (e) {
  e.preventDefault();
  arrJobs.splice(currentTarget.getAttribute("index"), 1);
  renderJobs(arrJobs);
  localStorage.setItem("jobs", JSON.stringify(arrJobs));
});

columns.forEach((item) => {
  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  item.addEventListener("drop", function (e) {
    e.preventDefault();
    arrJobs.splice(currentTarget.getAttribute("index"), 1);
    // renderJobs(arrJobs);
    this.appendChild(currentTarget);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  arrJobs.push(jobContent.value);
  jobContent.value = "";
  renderJobs(arrJobs);
  localStorage.setItem("jobs", JSON.stringify(arrJobs));
  resetTarget();
});

function resetTarget() {
  targets = document.querySelectorAll(".content__job-item");
  targets.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      currentTarget = this;
    });
  });
}
