const url = 'http://127.0.0.1:3000/fruits';

const fruitHTML = (fruit) => `
  <div class="fruit">
    <span class="fruit-id">${fruit.id}</span>
    ${fruit.name}
    <button class="delete-btn" data-id="${fruit.id}">Delete</button>
  </div>
`;

const fruitsHTML = (fruits) => `<div id="fruits">${fruits.map((fruit) => fruitHTML(fruit)).join('')}</div>`;

const fetchAllFruits = async () => {
  try {
    const response = await fetch(url);
    const fruits = await response.json();
    return fruits;
  } catch (error) {
    console.error(error);
  }
};

const deleteFruit = async (fruitId) => {
  try {
    const response = await fetch(`${url}/${fruitId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log(`Fruit with ID ${fruitId} has been deleted.`);
      return true;
    } else {
      console.error('Failed to delete fruit');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const main = async () => {
  const fruits = await fetchAllFruits();
  const rootElement = document.querySelector('#root');
  rootElement.insertAdjacentHTML('beforeend', fruitsHTML(fruits));

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const fruitId = button.getAttribute('data-id');
      const deleted = await deleteFruit(fruitId);
      if (deleted) {
        // Remove the deleted fruit from the UI
        const fruitElement = button.closest('.fruit');
        fruitElement.remove();
      }
    });
  });
};

window.addEventListener('load', main);



// const url = 'http://127.0.0.1:3000/fruits';

// const fruitHTML = fruit => `
// <div class="fruit">
// <span class="fruit-id">${fruit.id}</span> 
// ${fruit.name} 
// <button class="delete-btn" type="submit">Delete</button>
// </div>
// `;

// const fruitsHTML = fruits => `<div id="fruits">${fruits.map(fruit => fruitHTML(fruit)).join("")}</div>`;

// const fetchAllFruits = async () => {
//     try {
//         const response = await fetch(url) //lehetne 2. paraméter is, de alapból GET-et csinál
//         const fruits = await response.json()
//         return fruits;
//     } catch (error) {
//         console.error(error)
//     }
// }

// const deleteFruit = async (fruitId) => {
//         const response = await fetch(`${url}/${fruitId}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             console.error('Failed to delete fruit');
//         }
//   };

// const main = async () => {
//     const fruits = await fetchAllFruits();
//     const rootElement = document.querySelector('#root');
//     rootElement.insertAdjacentHTML('beforeend', fruitsHTML(fruits));
// }

// window.addEventListener("load", main);