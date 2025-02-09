require("dotenv").config();

const http = require("http");

const { MongoClient } = require("mongodb");

const URI = process.env.API_URL;
const client = new MongoClient(URI);

/*
createUser -> 유저 객체를 인수로 받아 서버에 저장하는 함수
1. connecting server // use await -> Data can be inserted before the server is connected //

2. choosing database 
3. choosing collection

4. inserting data  // use await -> the following code can be run before the data is inserted  //

5. verify that data was inserted

6. closing server // use await -> the following code can be run before the server ends its connection //

// await -> 이코드가 실행이 완료 될때까지 다음 코드가 실행되면 안될때 //
*/

async function createUser(user) {
   try {
      //1. connecting server
      await client.connect();
      //2. choosing database
      const db = client.db("TestDBServer");
      //3. choosing collection
      const collection = db.collection("users");
      //4. inserting data
      const result = await collection.insertOne(user);
      //5. verify that data was inserted
      console.log(`inserted${result.insertedId}`);
   } catch (err) {
      console.log(err);
   } finally {
      //6. closing server
      await client.close();
   }
}

/*
커서 형태의 데이터를 가지고 와서 출력하는 함수 
1.서버 연결
2.데이터베이스 선택
3.컬렉션 선택
4.데이터를 커서 형태로 검색
5.커서 객체정보 출력
*/
async function getUserData() {
   try {
      await client.connect();
      const db = client.db("TestDBServer");
      const collection = db.collection("users");
      const data = await collection.find().toArray();

      console.log(data);
      
   } finally {
      await client.close();
   }
};
/*
   open the server 
   /users -> get처리
*/
const server = http.createServer(async(req, res) => {
   
   try {
      await client.connect();
      const db = client.db("TestDBServer");
      const collection = db.collection("users");

      //Get 요청 처리
      if(req.method === "GET" && req.url === "/users"){
         const data = await collection.find().toArray();
         res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
         res.writeHead(200, { 'Content-Type': 'application/json'});
         res.end(JSON.stringify(data));
      }
   } catch (error) {
      console.log(`error`);
   } finally {
      await client.close()
   }
   
});


const userSchema = {
   name: { type: "string", required: true },
   age: { type: "number", min: 0 },
   email: { type: "string", unique: true },
   createAt: { type: "date", default: Date.now },
};

const newUser = {
   name: "John Doe",
   age: 30,
   email: "JohnDoe@example.com",
};

let data = getUserData();
console.log(data);

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

