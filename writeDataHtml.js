
const API_URL = "/users"
const $container = document.querySelector(".container");

//$container.insertAdjacentHTML("beforeend", `<div class="container__todoList">내일 할일2</div>`);

const getData = async() => {
  let res = await fetch(API_URL);
  console.log(res.status);

  try{
    let data = await res.json();
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

getData();