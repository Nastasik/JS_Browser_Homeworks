'use strict';

function handleTableClick(event) {
    event.currentTarget.dataset.sortBy = event.target.dataset.propName;
  
    (event.target.dataset.dir === '1' || event.target.dataset.dir === undefined) ? 
                            event.target.dataset.dir = '-1' : 
                            event.target.dataset.dir = '1';   
    
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
}

const table = document.querySelector('table');
table.addEventListener('click', handleTableClick);