document.querySelector('#change').addEventListener('click', () => {

    let pL = d3.select('div.content')
        .selectAll('b')
        .nodes()
        .map(item => item.textContent)
        .join(' ');

    let newP = d3.select('body')
        .insert('p', 'h4');

    newP.data([pL])
        .text(d => d);
});
