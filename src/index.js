localStorage.clear();
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      // debugger
      const next_fetch = response.info.next;
      localStorage.setItem("next_fetch",next_fetch);
      console.log(next_fetch);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  // getData(API);
  if(localStorage.getItem("next_fetch")) {
    await getData(localStorage.getItem("next_fetch"))
  } else {
    await getData(API);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);