const inputDiagonals = document.getElementById('choose_diagonals');
const inputAngle = document.getElementById('choose_angle');
const diagonalsForm = document.querySelector('.input_diagonali');
const angleForm = document.querySelector('.input_angle');

function ShowInputForm() {
    // Подсвечиваем форму, если ничего не выбрано
    if (!inputDiagonals.checked && !inputAngle.checked) {
        document.querySelector('.form_choose').classList.add('error-input');
        return;
    } else {
        document.querySelector('.form_choose').classList.remove('error-input');
    }

    if (inputDiagonals.checked) {
        diagonalsForm.style.display = 'block';
        angleForm.style.display = 'none';
    } else if (inputAngle.checked) {
        angleForm.style.display = 'block';
        diagonalsForm.style.display = 'none';
    }
}

function Compute_Result() {
    let result = '';

    if (inputDiagonals.checked) {
        const d1 = parseFloat(document.getElementById('input1').value);
        const d2 = parseFloat(document.getElementById('input2').value);

        if (isNaN(d1) || d1 <= 0) {
            document.getElementById('input1').classList.add('error-input');
            return;
        } else {
            document.getElementById('input1').classList.remove('error-input');
        }

        if (isNaN(d2) || d2 <= 0) {
            document.getElementById('input2').classList.add('error-input');
            return;
        } else {
            document.getElementById('input2').classList.remove('error-input');
        }

        if (document.getElementById('task1').checked) {
            const side = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
            const perimeter = 4 * side;
            result += `Периметр: ${Math.round(perimeter * 100) / 100}<br>`;
        }
        if (document.getElementById('task2').checked) {
            const area = (d1 * d2) / 2;
            result += `Площадь: ${Math.round(area * 100) / 100}<br>`;
        }
        if (document.getElementById('task3').checked) {
            const side = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
            const height = (d1 * d2) / (2 * side);
            result += `Высота: ${Math.round(height * 100) / 100}<br>`;
        }
    } else if (inputAngle.checked) {
        const a = parseFloat(document.getElementById('input3').value);
        const u = parseFloat(document.getElementById('input4').value);

        if (isNaN(a) || a <= 0) {
            document.getElementById('input3').classList.add('error-input');
            return;
        } else {
            document.getElementById('input3').classList.remove('error-input');
        }

        if (isNaN(u) || u <= 0 || u>=180) {
            document.getElementById('input4').classList.add('error-input');
            return;
        } else {
            document.getElementById('input4').classList.remove('error-input');
        }

        const rad = u * (Math.PI / 180);

        if (document.getElementById('task1').checked) {
            const perimeter = 4 * a;
            result += `Периметр: ${Math.round(perimeter * 100) / 100}<br>`;
        }
        if (document.getElementById('task2').checked) {
            const area = a * a * Math.sin(rad);
            result += `Площадь: ${Math.round(area * 100) / 100}<br>`;
        }
        if (document.getElementById('task3').checked) {
            const height = a * Math.sin(rad);
            result += `Высота: ${Math.round(height * 100) / 100}<br>`;
        }
    }

    if (!document.getElementById('task1').checked && 
    !document.getElementById('task2').checked && 
    !document.getElementById('task3').checked) {
    document.querySelector('.question div').classList.add('error-text');
    return;
} else {
    document.querySelector('.question div').classList.remove('error-text');
}

    document.getElementById('output').innerHTML = result;
}

function Clear_All() {
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';
    document.getElementById('input4').value = '';
    document.getElementById('task1').checked = false;
    document.getElementById('task2').checked = false;
    document.getElementById('task3').checked = false;
    document.getElementById('output').innerHTML = '';

    // Убираем подсветку ошибок
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.classList.remove('error-input'));

    // Убираем подсветку текста "Найти"
    document.querySelector('.question div').classList.remove('error-text');
}
