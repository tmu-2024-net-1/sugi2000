const chars = '、。一二三四五六七八九十'.split('');
const container = document.querySelector('#container');

for (const char of chars) {
  for (let j = 0; j < 10; j++) {
    const div = document.createElement('div');
    div.classList.add('flex', 'h-4');
    container.appendChild(div);
    for (let i = 0; i < 150; i++) {
      const childDiv = document.createElement('div');
      childDiv.classList.add('char', 
        'flex', 'items-center', 'justify-center',
        'h-4', 
        'transition-all', 
        'cursor-pointer', 'select-none', 
        'text-sm', 'font-bold', 'w-4');
      childDiv.textContent = char;
      div.appendChild(childDiv);
    }
  }
}

const charElems = document.querySelectorAll('.char');
charElems.forEach((elem) => {
  elem.addEventListener('mouseenter', () => {
    elem.classList.toggle('bg-black');
    elem.classList.toggle('text-white');
    elem.classList.toggle('duration-1000');
    setTimeout(() => {
      elem.classList.toggle('bg-black');
      elem.classList.toggle('text-white');
    }, 1000);
  });
  elem.addEventListener('mouseleave', () => {
    // elem.classList.toggle('duration-1000');
  });
});
