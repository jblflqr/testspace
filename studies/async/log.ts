const log = (content) => {
  let p = document.createElement("p");
  p.innerHTML = content;
  document.body.appendChild(p);
};