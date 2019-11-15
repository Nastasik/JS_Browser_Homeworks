const tabsContent = document.querySelector('.tabs-content');
const tabsNav = document.querySelector('.tabs-nav');

const currentTab = tabsNav.firstElementChild;
tabsNav.removeChild(currentTab);

for (child of tabsContent.children) {
  const tab = currentTab.cloneNode(true);
  tab.querySelector('a').textContent = child.getAttribute('data-tab-title');
  tab.querySelector('a').classList.add(child.getAttribute('data-tab-icon'));
  tabsNav.appendChild(tab);  
}

function activeButtons() {
  for (let tab of tabsNav.children) {
    tab.classList.remove('ui-tabs-active');
  }
  this.classList.add('ui-tabs-active');
}

function changeArticles() {
  for (let child of tabsContent.children) {
    child.classList.add('hidden');
    if (child.getAttribute('data-tab-title') === this.querySelector('a').textContent)  {
      child.classList.remove('hidden');
    }
  }
}

tabsNav.firstElementChild.classList.add('ui-tabs-active');

for (let tab of tabsNav.children) {
  tab.addEventListener('click', activeButtons);
  tab.addEventListener('click', changeArticles);
}