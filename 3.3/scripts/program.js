//выводим таблицу на страницу
let createTable = (data, idTable) => {
  // находим таблицу
  let table = document.getElementById(idTable)
  // формируем заголовочную строку из ключей нулевого элемента массива
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




// ФИЛЬТРАЦИЯ
let dataFilter = dataForm => {
  let dictFilter = {};
  // перебираем все элементы формы с фильтрами
  for (let j = 0; j < dataForm.elements.length; j++) {
    let item = dataForm.elements[j]
    let valInput = item.value
    if (item.type == 'text') {
      valInput = valInput.toLowerCase()
    } else if (item.type == 'number') {
      if (valInput !== '') {
        valInput = parseFloat(valInput)
      } else {
        if (item.id.includes('From')) {
          valInput = Number.NEGATIVE_INFINITY
        } else if (item.id.includes('To')) {
          valInput = Number.POSITIVE_INFINITY
        }
      }
    }
    dictFilter[item.id] = valInput
  }
  return dictFilter
}

let filterTable = (data, idTable, dataForm) => {
  let datafilter = dataFilter(dataForm)
  let tableFilter = data.filter(item => {
    let result = true
    for (let key in item) {
      let val = item[key]
      if (typeof val == 'string' && key in correspond) {
        val = val.toLowerCase()
        if (datafilter[correspond[key]]) {
          let filterVal = datafilter[correspond[key]].toLowerCase()
          result &&= val.indexOf(filterVal) !== -1 && val.startsWith(filterVal)
        }
      } else if (typeof val == 'number' && key in correspond) {
        let filterValues = datafilter[correspond[key][0]] || null
        let toValue = datafilter[correspond[key][1]] || null
        if (filterValues !== null && toValue !== null) {
          result &&= filterValues <= val && val <= toValue
        } else if (filterValues !== null) {
          result &&= filterValues <= val
        } else if (toValue !== null) {
          result &&= val <= toValue
        }
      }
    }
    return result
  })

  if (datafilter['precipitation']) {
    tableFilter = tableFilter.filter(item => {
      return parseInt(item['Осадки']) === parseInt(datafilter['precipitation'])
    })
  }

  clearTable(idTable)
  createTable(tableFilter, idTable)
}

let clearFilter = () => {
  document.getElementById('filterForm').reset()
  clearTable('list')
  createTable(Weather_Array, 'list')
}

function clearTable (idTable) {
  let table = document.getElementById(idTable)
  while (table.rows.length > 0) {
    table.deleteRow(0)
  }
}
// СОРТИРОВКА
// формирование полей элемента списка с заданным текстом и значением
let createOption = (str, val) => {
  let item = document.createElement('option')
  item.text = str
  item.value = val
  return item
}


// формирование полей со списком из заголовков таблицы
// параметры – массив из заголовков таблицы и элемент select
let setSortSelect = (head, sortSelect) => {
  sortSelect.append(createOption('Нет', 0))
  for (let i in head) {
    sortSelect.append(createOption(head[i], Number(i) + 1))
  }
}

let setSortSelects = (data, dataForm) => {
  let head = Object.keys(data)
  let allSelect = dataForm.getElementsByTagName('select')

  for (let j = 0; j < allSelect.length; j++) {
    setSortSelect(head, allSelect[j])
    if (j !== 0) {
      allSelect[j].disabled = true
    }
  }
}
// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
  let nextSelect = document.getElementById(nextSelectId)
  nextSelect.disabled = false
  nextSelect.innerHTML = curSelect.innerHTML
  if (curSelect.value != 0) {
    nextSelect.remove(curSelect.selectedIndex)
  } else {
    nextSelect.disabled = true
  }
}
/*формируем массив для сортировки по уровням вида:
 [
 {column: номер столбца,
 order: порядок сортировки (true по убыванию, false по возрастанию)
 },
 {column: номер столбца,
 order: порядок сортировки
 }
 ]
*/

let createSortArr = data => {
  let sortArr = []

  let sortSelects = data.getElementsByTagName('select')

  for (let i = 0; i < sortSelects.length; i++) {
    let keySort = sortSelects[i].value
    if (keySort == 0) {
      break
    }
    let order = 1
    let descCheckboxId = `fields${i + 1}Desc`
    let descCheckbox = document.getElementById(descCheckboxId)
    if (descCheckbox && descCheckbox.checked) {
      order = -1
    }
    sortArr.push({ column: keySort - 1, order: order })
  }
  return sortArr
}

let sortTable = (idTable, data) => {
  let sortArr = createSortArr(data)

  if (sortArr.length === 0) {
    return false
  }

  let table = document.getElementById(idTable)
  let rowData = Array.from(table.rows)

  rowData.shift()
  rowData.sort((first, second) => {
    for (let i in sortArr) {
      let key = sortArr[i].column
      let order = sortArr[i].order

      let one = first.cells[key].innerHTML
      let two = second.cells[key].innerHTML

      if (parseFloat(one) && parseFloat(two)) {
        one = parseFloat(one)
        two = parseFloat(two)
      }
      if (one > two) return 1 * order
      else if (one < two) return -1 * order
    }
    return 0
  })
  while (table.rows.length > 1) {
    table.deleteRow(1)
  }
  rowData.forEach(item => {
    table.append(item)
  })
}

let resetSort = () => {
  document.getElementById('firstLevelSort').selectedIndex = 0
  document.getElementById('secondLevelSort').selectedIndex = 0
  document.getElementById('thirdLevelSort').selectedIndex = 0
  document.getElementById('secondLevelSort').disabled = true
  document.getElementById('thirdLevelSort').disabled = true

  document.getElementById('fields1Desc').checked = false
  document.getElementById('fields2Desc').checked = false
  document.getElementById('fields3Desc').checked = false
}

document.addEventListener('DOMContentLoaded', function () {
  createTable(Weather_Array, 'list')
  let searchButton = document.getElementById('searchFilter')

  searchButton.addEventListener('click', function () {
    let dataForm = document.getElementById('filterForm')
    filterTable(Weather_Array, 'list', dataForm)
  })

  let clearButton = document.getElementById('clearFilter')
  clearButton.addEventListener('click', function () {
    clearFilter()
  })

  let dataForm = document.getElementById('sortForm')
  setSortSelects(Weather_Array[0], dataForm)

  let sortButton = document.getElementById('sortButton')
  sortButton.addEventListener('click', function () {
    let dataForm = document.getElementById('sortForm')
    sortTable('list', dataForm)
  })

  let firstLevelSelect = document.getElementById('firstLevelSort')
  let secondLevelSelect = document.getElementById('secondLevelSort')

  firstLevelSelect.addEventListener('change', function () {
    changeNextSelect('secondLevelSort', this)
  })

  secondLevelSelect.addEventListener('change', function () {
    changeNextSelect('thirdLevelSort', this)
  })

  let clearSortButton = document.getElementById('clearSort')
  clearSortButton.addEventListener('click', function () {
    resetSort('list')
    clearTable('list')
    createTable(Weather_Array, 'list')
  })
})
