
const API_URL = "http://localhost:3000/users"
const $container = document.querySelector(".container");

const getData = async() => {
  let res = await fetch(API_URL);

  try{
    let data = await res.json();
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

/*
서버에서 데이터를 받아와서 화면에 표시해주는 함수
1. fetch를 활용하여 데이터를 받아오기
2. 데이터를 사용하기위한 형식으로 가공하기
3. insertAdjacentHTML작성하기
4. try안의 명령이 실행되지 못했을대 에러정보 표시명령 작성하기
*/
const writeTodoList = async() => {
  //fetch는 실행된후 response를 반환하는데 이 response정보를 res라는 변수에 담아둠
  let res = await fetch(API_URL);
  
  try {
    if(res){
      //response안에 받은 데이터의 정보가 있는데 .json()을 활용하면 데이터를 불러올수 있음
      let data = await res.json();
      //insertAdjacentHTML을 활용해서 화면에 표시시
      $container.insertAdjacentHTML("beforeend", 
        `<div class="container__todoList">
            <div class="todoList--title">
              ${data[0].name}
            </div>
            <div class="todoList--detail">
              ${data[0].email}
            </div>
        </div>`)
    }
  } catch (err) {
    console.log(err);
  }
}

getData();
writeTodoList();