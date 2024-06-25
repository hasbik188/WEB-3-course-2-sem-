let createTable = (data, idTable) => {
  let table = document.getElementById(idTable)
  var tr = document.createElement('tr')

  for (key in data[0]) {
    let th = document.createElement('th')
    th.innerHTML = key
    tr.append(th)
  }
  table.append(tr)

  data.forEach(item => {
    tr = document.createElement('tr')

    for (value in item) {
      let td = document.createElement('td')
      td.innerHTML = item[value]
      tr.append(td)
    }

    table.append(tr)
  })
}
 // checkboxes в массив, фильтруем отмеченные и возвращаем их значения
function getSelectedOY (data) {
  return Array.from(data.oy)
    .filter(input => input.checked)
    .map(input => input.value)
}
// Входные данные:
// data - исходный массив (например, buildings)
// key - поле, по которому осуществляется группировка
function createArrGraph (data, key, selectedOY) {
  // преобразуем исходный массив данных в массив для графика
  let arrGraph = data.map(d => {
    let entry = { labelX: d[key] }
    selectedOY.forEach(oy => {
      entry[oy] = d[oy]
    })
    return entry
  })
  return arrGraph
}

const marginX = 50
const marginY = 50
const height = 900
const width = 1400
let svg = d3.select('svg').attr('height', height).attr('width', width)

function drawGraph (data) {
  // значения по оси ОХ
  const keyX = data.ox.value
  // олучаем выбранные значения по оси Y
  const selectedOY = getSelectedOY(data)
  const chartType = data.chartType.value

  // Выбрана ли хотя бы одна категория?
  if (selectedOY.length === 2 || selectedOY.length === 0) {
    alert('Выберите только одну категорию для оси OY')
    return
  }

  // создаем массив для построения графика
  const arrGraph = createArrGraph(Weather_Array, keyX, selectedOY)

  svg.selectAll('*').remove()

  // создаем шкалы преобразования и выводим оси
  const [scX, scY] = createAxis(arrGraph, selectedOY)

  // рисуем графики
  selectedOY.forEach((oy, index) => {
    const color = d3.schemeCategory10[index % 10]
    createChart(arrGraph, scX, scY, oy, color, chartType)
  })
}
function createAxis(data, selectedOY, minOYValue) {
  // собираем все значения выбранных полей в один массив
  let allValues = [];
  selectedOY.forEach(oy => {
    allValues = allValues.concat(data.map(d => d[oy]));
  });

  // создаём шкалу для оси X
  let scaleX = d3
    .scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, width - 2 * marginX]);

  // создаём шкалу для оси Y
  let scaleY = d3
    .scaleLinear()
    .domain([minOYValue, d3.max(allValues) * 1.1])
    .range([height - 2 * marginY, 0]);

  // создание осей
  let axisX = d3.axisBottom(scaleX); // горизонтальная
  let axisY = d3.axisLeft(scaleY); // вертикальная

  // отрисовка осей в SVG-элементе
  svg
    .append('g')
    .attr('transform', `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .selectAll('text') // подписи на оси - наклонные
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', d => 'rotate(-45)');

  svg
    .append('g')
    .attr('transform', `translate(${marginX}, ${marginY})`)
    .call(axisY);

  return [scaleX, scaleY];
}

function drawGraph(data) {
  // значения по оси ОХ
  const keyX = data.ox.value;
  // олучаем выбранные значения по оси Y
  const selectedOY = getSelectedOY(data);
  const chartType = data.chartType.value;

  // Выбрана ли хотя бы одна категория?
  if (selectedOY.length !== 1) {
    alert('Выберите только одну категорию для оси OY');
    return;
  }

  // создаем массив для построения графика
  const arrGraph = createArrGraph(Weather_Array, keyX, selectedOY);

  svg.selectAll('*').remove();

  // задаём минимальное значение для оси Y
  let minOYValue = 0;
  if (selectedOY.includes("Атмосферное давление")) {
    minOYValue = 680;
  }

  // создаем шкалы преобразования и выводим оси
  const [scX, scY] = createAxis(arrGraph, selectedOY, minOYValue);

  // рисуем графики
  selectedOY.forEach((oy, index) => {
    const color = d3.schemeCategory10[index % 10];
    createChart(arrGraph, scX, scY, oy, color, chartType);
  });
}

function createChart(data, scaleX, scaleY, oy, color, chartType) {
  const r = 4;
  // чтобы точки не накладывались, сдвинем их по вертикали
  if (chartType === 'dot') {
    svg
      .selectAll(`.dot-${oy}`)
      .data(data)
      .enter()
      .append('circle')
      .attr('r', r)
      .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr('cy', d => scaleY(d[oy]))
      .attr('transform', `translate(${marginX}, ${marginY})`)
      .style('fill', color);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  createTable(Weather_Array, 'list');
  drawGraph(document.getElementById('graph_form'));
});
