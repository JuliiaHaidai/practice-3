export default function filterTable(tbody, filters) {
  if (filters.length = 0){}
  else{
    for (const elem of tbody.children){
      elem.classList.remove('d-none')
    }
    for(const [key, value] of Object.entries(filters)){
      const elem_td = tbody.querySelectorAll(`tr > td[data-field-name = ${key}]`);
      for(let i = 0; i < elem_td.length; i++){
        if(!elem_td[i].innerHTML.includes(value)){
          elem_td[i].parentNode.classList.add('d-none');
        }
      }
      let count = 1;
      for (let j = 0; j < tbody.children.length; j++){
        if(tbody.children[j].classList.contains('d-none')){
          continue;
        }
        if(!(count % 2)){
          tbody.children[j].classList.add('table-row-even')
        }
        else{
          tbody.children[j].classList.remove('table-row-even')
        }
        tbody.children[j].children[0].innerHTML = count;
        count++
      }
    }
  }
}

