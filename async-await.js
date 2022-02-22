/*


*/
//'hello' 반환
function hello() { return "Hello" };
hello();

// promise 반환
async function hello() { return "Hello" };
hello();

// await 키워드는 웹 API를 포함하여 Promise를 반환하는 함수를 호출할 때 사용할 수 있습니다.
//그리고 실행을 기다리는 다른 코드들을 중지시키지 않고 그대로 실행되게 합니다.
// await는 async 함수 안에서만 쓸 수 있다.
// await 키워드는 JavaScript 런타임이 이 라인에서 비동기 코드를 일시 중지하여 비동기 함수 호출이 결과를 반환할 때 까지 기다리게 합니다. 그러나 외부의 다른 동기 코드는 실행될 수 있도록 합니다. 
async function hello() {
    return greeting = await Promise.resolve("Hello");
};
  
hello().then(alert);

fetch('coffee.jpg')
.then(response => response.blob())
.then(myBlob => {
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});

//then없이 훨씬 깔끔하게 작성할 수 있다.
async function myFetch() {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();
  
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  }
  
  myFetch()
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });

  //promise와 await를 하이브리드로 사용할 수도 있다.
  async function myFetch() {
    let response = await fetch('coffee.jpg');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.blob();
  
  }
  
  myFetch().then((blob) => {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  }).catch(e => console.log(e));


  //.then과 .catch
  //.try과 .catch를 모두 사용할 수 있다.
  async function myFetch() {
    try {
      let response = await fetch('coffee.jpg');
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let myBlob = await response.blob();
      let objectURL = URL.createObjectURL(myBlob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
  
    } catch(e) {
      console.log(e);
    }
  }
  
  myFetch();

  async function myFetch() {
    let response = await fetch('coffee.jpg');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.blob();
  
  }
  
  myFetch().then((blob) => {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) =>
    console.log(e)
  );

  