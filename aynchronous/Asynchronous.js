/*
비동기 프로그래밍 의미
fetch는 non-blocking으로 실행이 끝나지 않아도 다음코드를 실행한다
때문에 starting
it worked
all done가 아니라 
starting
all done
it worked 순서대로 나온다.

*/
console.log ('Starting');
let image;

fetch('coffee.jpg').then((response) => {
  console.log('It worked :)')
  return response.blob();
}).then((myBlob) => {
  let objectURL = URL.createObjectURL(myBlob);
  image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}).catch((error) => {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log ('All done!');

/*
addevenetlistener도 fetch와 마찬가지이다.
*/


console.log("registering click handler");

button.addEventListener('click', () => {
  console.log("get click");
});

console.log("all done");