const field1 = initField();
const field2 = initField();
const field1Node = document.getElementById('field-1');
const field2Node = document.getElementById('field-2');

placeShips(field1);
drawField(field1Node, field1);
drawField(field2Node, field2);

/**
 * Заполняет начальные значения поля боя
 * @param {number} [size] - размер поля боя, по умолчанию 10
 * @returns {Array.<string|number[]>} двумерный массив, хранящий состояние поле боя
 */
function initField(size = 10) {
    const field = Array(size + 1);
    let verticalLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    let horizontalLabels = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    
    for (let i = 0; i < size + 1; i++) {
        field[i] = Array(size + 1);

        for (let j = 0; j < size + 1; j++) {
            if (i === 0 && j === 0) {
                field[i][j] = '';
            } else if (i === 0) {
                field[i][j] = horizontalLabels[j - 1]
            } else if (j === 0) {
                field[i][j] = verticalLabels[i - 1];
            } else {
                field[i][j] = 0;
            }
        }
    }

    return field;
}

/**
 * Рендерит поле боя
 * @param {HTMLElement} elem - DOM Node, в которую рендерится поле боя
 * @param {Array.<string|number[]>} field - двумерный массив, хранящий состояние поле боя (0 - пусто, 1 - корабль, 2 - попадание)
 * @param {boolean} [hidden] - в значении true скрываются вражеские корабли, по умолчанию false
 */
function drawField(elem, field, hidden = false) {
    for (let i = 0; i < field.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < field[i].length; j++) {
            const cell = document.createElement('td');
            cell.className = 'cell';
            cell.dataset.pos = `${i}:${j}`;

            if (i === 0 || j === 0) {
                cell.innerText = field[i][j];
                cell.classList.add('cell--label');
            } else if (field[i][j] === 1) {
                cell.classList.add('cell--live');
            } else if (field[i][j] === 0) {
                cell.classList.add('cell--empty');
            }

            row.appendChild(cell);
        }

        elem.appendChild(row);
    }
}

/**
 * Располагает корабли на поле боя
 * @param {Array.<string|number[]} field -двумерный массив, хранящий состояние поле боя
 */
function placeShips(field) {
    field[1][5] = 1; field[1][6] = 1; field[1][7] = 1; field[1][8] = 1;

    field[2][2] = 1; field[3][2] = 1; field[4][2] = 1;
    field[4][4] = 1; field[4][5] = 1; field[4][6] = 1;

    field[10][2] = 1; field[10][3] = 1;
    field[8][10] = 1; field[9][10] = 1;
    field[3][8] = 1; field[3][9] = 1;

    field[6][2] = 1;
    field[8][3] = 1;
    field[7][6] = 1;
    field[5][9] = 1;
}