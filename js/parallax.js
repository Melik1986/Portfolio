// // Используем правильные селекторы - по ID вместо классов
// let text = document.querySelector('#text');
// let mount = document.querySelector('#mount');
// let mount1 = document.querySelector('#mount1');
// let mount2 = document.querySelector('#mount2');
// let city = document.querySelector('#city');

// console.log(text, mount, mount1, mount2, city); // Для отладки

// window.addEventListener('scroll', function () {
//   let value = window.scrollY;
  
//   // Добавим проверки на null для безопасности
//   if (text) text.style.transform = `translateY(${value * -0.5}px)`;
//   if (mount) mount.style.transform = `translateY(${value * 0.2}px)`;
//   if (mount1) mount1.style.transform = `translateY(${value * 0.3}px)`;
//   if (mount2) mount2.style.transform = `translateY(${value * 0.4}px)`;
//   if (city) city.style.transform = `translateY(${value * 0.1}px)`;
// });

let text = document.querySelector('#text');
let mount = document.querySelector('#mount');
let mount1 = document.querySelector('#mount1');
let mount2 = document.querySelector('#mount2');
let city = document.querySelector('#city');

window.addEventListener('scroll', function () {
    let value = window.scrollY;
    if (text) text.style.marginTop = value * -1.5 + 'px';
    if (mount) mount.style.top = value * 0.75 + 'px';
    if (mount1) mount1.style.top = value * 0.5 + 'px';
    if (mount2) mount2.style.top = value * 0.25 + 'px';
    // if (city) city.style.top = value * 0.3 + 'px';
})