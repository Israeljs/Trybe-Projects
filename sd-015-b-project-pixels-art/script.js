window.onload = function () {
  const colorPalette = document.querySelector('#color-palette');
  const boardLines = document.querySelectorAll('.line');
  const colors = ['black', 'green', 'yellow', 'red'];
  const initialColor = 'white';
  paletteCreator(colorPalette);
  fillBoard(boardLines);
  colorSelect();
  toPaint();
  clear();

  // paleta de cores
  function paletteCreator(linha) {
    for (let i = 0; i < colors.length; i += 1) {
      const colorBox = boxCreator('color');

      colorBox.style.backgroundColor = colors[i];
      linha.appendChild(colorBox);
    }
  }

  function boxCreator(classe) {
    const box = document.createElement('div');
    box.className = classe;
    return box;
  }
  // Quadro de pixels

  function fillBoard(linhas) {
    for (let i = 0; i < linhas.length; i += 1) {
      fillLine(linhas[i]);//  para cada linha cria 5 divs
    }
  }

  function fillLine(boardLine) {
    for (let i = 0; i < boardLines.length; i += 1) {
      const box = boxCreator('pixel');

      box.style.backgroundColor = initialColor;
      boardLine.appendChild(box);
    }
  }
};

function colorSelect() {
  const color = document.querySelectorAll('.color');

  for (let i = 0; i < color.length; i += 1) {
    color[0].classList.add('selected');
    color[i].addEventListener('click', function (event) {
      const colorSelected = document.querySelector('.selected');
      colorSelected.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
}

function toPaint() {
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', function (event) {
      const colorSelected = document.querySelector('.selected').style.backgroundColor;
      event.target.style.backgroundColor = colorSelected;
    });
  }
}

function clear() {
  const clearButton = document.getElementById('clear-board');

  clearButton.addEventListener('click', function (event) {
    const pixels = document.querySelectorAll('.pixel');

    for (let i = 0; i < pixels.length; i += 1) {
      const bgc = pixels[i];

      bgc.style.backgroundColor = 'white';
    }
  });
}
