class Field {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.cells = [];
      this.create();
    }
  
    create() {
      const fieldElement = document.querySelector('.field');
      fieldElement.style.width = `${this.width * 35}px`;
      fieldElement.style.height = `${this.height * 35}px`;
      
      for (let i = 0; i < this.width * this.height; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        
      this.cells.push(cellElement);
      fieldElement.appendChild(cellElement);
      }
    }
    
    clear() {
      this.cells.forEach(cell => cell.className = 'cell');
    }
    
    getCell(x, y) {
      return this.cells[y * this.width + x];
    }
  }
  
  class Snake {
    constructor() {
      this.body = [{x: 1, y: 0},
                  {x: 0, y: 0}];
      this.direction = {x: 1, y: 0};
      this.isAlive = true;
      
      this.score = 0;
      this.record = localStorage.getItem("record") || 0;
      document.querySelector('.record').textContent = `Your Record: ${this.record}`;
    }
    
    move() {
      const head = this.getNextHead();
      if (this.isCollision(head)) {
        this.isAlive = false;
        return isGameOn = false;
      }
  
      this.body.unshift(head);
      
      if (head.x === food.x && head.y === food.y) {
        this.score++;
        this.record = this.score >= this.record ? this.score : this.record;
        localStorage.setItem("record", this.record);
        food.generate();
      } else {
        this.body.pop();
      }
    }


    getNextHead() {
      const head = this.body[0];
      return {x: head.x + this.direction.x, y: head.y + this.direction.y};
    }
    
    isCollision(point) {
      return (
        point.x < 0 || point.x >= field.width || point.y < 0 || point.y >= field.height ||
        this.body.some(cell => cell.x === point.x && cell.y === point.y)
      );
    }
    
    setDirection(direction) {
      if (direction.x !== -this.direction.x || direction.y !== -this.direction.y) {
        this.direction = direction;
      }
    }
  
    draw() {
      this.body.forEach((cell, index) => {
        const element = field.getCell(cell.x, cell.y);
        if (index === 0) {
          element.classList.add('head');
        } else if (index === this.body.length - 1) {
          element.classList.add('tail');
        } else {
          element.classList.add('tail');
        }
      });
    }
    
    reset() {
      this.body = [{x: 1, y: 0},
                  {x: 0, y: 0}];
      this.direction = {x: 1, y: 0};
      this.isAlive = true;
      this.score = 0;
      this.record = localStorage.getItem("record") || 0;
      field.cells.forEach(cell => {
      cell.classList.remove('head', 'tail', 'food');
    });
      
      food.generate();
      food.draw();
      this.draw();
    }

    
    
  }
  

  class Food {
    constructor() {
      this.generate();
    }
    
    generate() {
        do {
        this.x = Math.floor(Math.random() * field.width);
        this.y = Math.floor(Math.random() * field.height);
      } while (snake.body.some(cell => cell.x === this.x && cell.y === this.y));
    }
    
    draw() {
      if (field.cells) {
      const element = field.getCell(this.x, this.y);
      element.classList.add('food');
      }
    }
  }
  
  const field = new Field(10, 10);
  const snake = new Snake();
  snake.draw()
  let food = new Food();
  food.draw()
  let isGameOn = false;
  
  function initGame() {
      if (!snake.isAlive) {
        alert(`Игра окончена! Ваш счет: ${snake.score}. Ваш рекорд: ${snake.record}`);
        return snake.reset();
      }
      
      field.clear();
      snake.draw();
      food.draw();
      snake.move();
      document.querySelector('.score').textContent = `Score: ${snake.score}`;
      document.querySelector('.record').textContent = `Your record: ${snake.record}`;
      
      setTimeout(initGame, 300);
  }
  
  document.addEventListener('keydown', event => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
      snake.setDirection({x: 0, y: -1});
    break;
      case 'KeyS':
      case 'ArrowDown':
      snake.setDirection({x: 0, y: 1});
    break;
      case 'KeyA':
      case 'ArrowLeft':
      snake.setDirection({x: -1, y: 0});
    break;
      case 'KeyD':
      case 'ArrowRight':
      snake.setDirection({x: 1, y: 0});
    break;
    }
  });
  
  document.querySelector('.start-game').addEventListener('click', function() {
    if (!isGameOn) {
    initGame();
    isGameOn = true;
    }
  });


  document.querySelector('.reset-game').addEventListener('click', function() {
  return snake.reset();
  });