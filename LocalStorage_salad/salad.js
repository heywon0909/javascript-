const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const uncheck = document.querySelector('.check_btn');
const reset = document.querySelector('.reset_btn');
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);

  function uncheckState(e){ // input checked 속성 삭제 
   items.forEach(item=>{
     item.done = false;
   });
   populateList(items,itemsList);
   localStorage.setItem('items',JSON.stringify(items));
  }
  uncheck.addEventListener('click',uncheckState);
  function allReset(e){ // li의 모든 목록 삭제 
    localStorage.removeItem('items');
    const ul = document.querySelector('.plates');
    const lists = ul.querySelectorAll('li');
    lists.forEach(list=>{
      list.remove();
    });
    
  }
  reset.addEventListener('click',allReset);