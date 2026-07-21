const Sanduicemenu = document.getElementById('sanduiche-menu');
const Listamenu = document.getElementById('lista-menu');

Sanduicemenu.addEventListener('click', () => {
    Listamenu.classList.toggle('ativo');
    Sanduicemenu.classList.toggle('ativo');
});

