import { Component } from '@angular/core';
import { Support } from './support2048';

@Component({
  selector: 'app-my2048',
  templateUrl: './my2048.component.html',
  styleUrls: ['./my2048.component.css']
})
export class My2048Component {
  /**
   * 游戏逻辑方法
   *
   * @type {Support}
   * @memberof My2048Component
   */
  public support: Support = new Support();

  /**
   * 游戏数据
   *
   * @type {any[]}
   * @memberof My2048Component
   */
  public board: any[] = [];

  /**
   * 游戏分数
   *
   * @type {number}
   * @memberof My2048Component
   */
  public score: number = 0;

  /**
   * 内容区布局对象
   *
   * @type {any[]}
   * @memberof My2048Component
   */
  public container: any[] = [];

  /**
   * 是否正在移动
   *
   * @private
   * @type {boolean}
   * @memberof My2048Component
   */
  private isNowMove: boolean = false;

  constructor() {
    this.initGameLayout();
    this.newGame();
    window.onkeydown = this.onKeyDown;
  }

  /**
   * 初始化游戏布局
   *
   * @memberof My2048Component
   */
  public initGameLayout(): void {
    this.board = [];
    this.container = [];
    // 初始化页面布局以及游戏数据二维数组
    for (let i = 0; i < 4; i++) {
      const arr: any[] = [];
      const numbers: any[] = [];
      for (let j = 0; j < 4; j++) {
        const top: number = this.support.getPosTop(i);
        const left: number = this.support.getPosLeft(j);
        arr.push({
          'id': `grid-cell-${i}-${j}`,
          'style': {
            'top': `${top}px`,
            'left': `${left}px`
          }
        });
        numbers.push({
          'id': `number-cell-${i}-${j}`,
          'style': {
            'width': '100px',
            'height': '100px',
            'top': `${top}px`,
            'left': `${left}px`,
            'display': 'none'
          },
          // 是否发生过碰撞
          'hasConflicted': false
        });
      }
      this.container.push(arr);
      this.board.push(numbers);
    }
  }

  /**
   * 开始新的游戏
   *
   * @memberof My2048Component
   */
  public newGame(): void {
    this.initGame();
    this.generateOneNumber();
    this.generateOneNumber();
  }

  /**
   * 初始化游戏
   *
   * @private
   * @memberof My2048Component
   */
  private initGame(): void {
    this.board.forEach((items: any[]) => {
      items.forEach((num) => {
        num.text = 0;
        Object.assign(num.style, { 'display': 'none' });
      });
    });
    this.score = 0;
  }

  /**
   * 更新游戏数据
   *
   * @private
   * @memberof My2048Component
   */
  private updateBoard(): void {
    this.board.forEach((items: any[], i: number) => {
      items.forEach((num: any, j: number) => {
        if (num.text === 0) {
          Object.assign(num.style, { 'display': 'none' });
        } else {
          Object.assign(num.style, {
            'display': 'block',
            'background-color': this.support.getNumberBackgroundColor(num.text),
            'color': this.support.getNumberColor(num.text)
          });
        }
        num.hasConflicted = false;
      });
    });
  }

  /**
   * 在一个位置随机生成数字
   *
   * @private
   * @memberof My2048Component
   */
  private generateOneNumber(): boolean {
    if (this.support.noSpace(this.board)) {
      return false;
    }
    // 随机一个位置
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);

    let times: number = 0;
    while (times < 50) {
      if (this.board[x][y].text === 0) {
        break;
      }
      const num: any = this.board[x][y];
      if (num.text === 0) {
        break;
      }
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);

      times++;
    }
    if (times === 50) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const num: any = this.board[i][j];
          if (num.text === 0) {
            x = i;
            y = j;
            break;
          }
        }
      }
    }
    // 随机一个数字
    const randNumber: number = Math.random() > 0.5 ? 2 : 4;
    // 在随机位置显示数字
    this.board[x][y].text = randNumber;
    Object.assign(this.board[x][y].style, {
      'display': 'block',
      'background-color': this.support.getNumberBackgroundColor(randNumber),
      'color': this.support.getNumberColor(randNumber)
    });
    return true;
  }

  /**
   * 键盘事件
   *
   * @memberof My2048Component
   */
  private onKeyDown = (event: any) => {
    if (this.isNowMove) {
      return;
    }
    this.isNowMove = true;
    switch (event.keyCode) {
      case 37: // left
        if (this.moveLeft()) {
          this.generateOneNumber();
          this.isGameOver();
        }
        break;
      case 38: // up
        if (this.moveUp()) {
          this.generateOneNumber();
          this.isGameOver();
        }
        break;
      case 39: // right
        if (this.moveRight()) {
          this.generateOneNumber();
          this.isGameOver();
        }
        break;
      case 40: // down
        if (this.moveDown()) {
          this.generateOneNumber();
          this.isGameOver();
        }
        break;
      default:
        break;
    }
    this.isNowMove = false;
  }

  /**
   * 游戏是否结束
   *
   * @private
   * @memberof My2048Component
   */
  private isGameOver(): void {
    if (this.support.noSpace(this.board) && this.support.noMove(this.board)) {
      this.gameOver();
    }
  }

  /**
   * 游戏结束
   *
   * @private
   * @memberof My2048Component
   */
  private gameOver(): void {
    alert('游戏结束');
  }

  /**
   * 向左移动
   *
   * @private
   * @returns {boolean}
   * @memberof My2048Component
   */
  private moveLeft(): boolean {
    if (!this.support.canMoveLeft(this.board)) {
      return false;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        const num: any = this.board[i][j];
        if (num.text !== 0) {
          for (let k = 0; k < j; k++) {
            const kNum: any = this.board[i][k];
            const noBlockHorizontal: boolean = this.support.noBlockHorizontal(i, k, j, this.board);
            if (kNum.text === 0 && noBlockHorizontal) {
              // move
              kNum.text = num.text;
              num.text = 0;
              continue;
            } else if (num.text === kNum.text && noBlockHorizontal && !kNum.hasConflicted) {
              // move
              // add
              kNum.text += num.text;
              num.text = 0;
              // add score
              this.score += kNum.text;
              kNum.hasConflicted = true;
              continue;
            }
          }
        }
      }
    }
    this.updateBoard();
    return true;
  }

  /**
   * 向右移动
   *
   * @private
   * @returns {boolean}
   * @memberof My2048Component
   */
  private moveRight(): boolean {
    if (!this.support.canMoveRight(this.board)) {
      return false;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        const num: any = this.board[i][j];
        if (num.text !== 0) {
          for (let k = 3; k > j; k--) {
            const kNum: any = this.board[i][k];
            const noBlockHorizontal: boolean = this.support.noBlockHorizontal(i, j, k, this.board);
            if (kNum.text === 0 && noBlockHorizontal) {
              // move
              kNum.text = num.text;
              num.text = 0;
              continue;
            } else if (num.text === kNum.text && noBlockHorizontal && !kNum.hasConflicted) {
              // move
              // add
              kNum.text += num.text;
              num.text = 0;
              // add score
              this.score += kNum.text;
              kNum.hasConflicted = true;
              continue;
            }
          }
        }
      }
    }
    this.updateBoard();
    return true;
  }

  /**
   * 向上移动
   *
   * @private
   * @returns {boolean}
   * @memberof My2048Component
   */
  private moveUp(): boolean {
    if (!this.support.canMoveUp(this.board)) {
      return false;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        const num: any = this.board[j][i];
        if (num.text !== 0) {
          for (let k = 0; k < j; k++) {
            const kNum: any = this.board[k][i];
            const noBlockVertical: boolean = this.support.noBlockVertical(i, k, j, this.board);
            if (kNum.text === 0 && noBlockVertical) {
              // move
              kNum.text = num.text;
              num.text = 0;
              continue;
            } else if (num.text === kNum.text && noBlockVertical && !kNum.hasConflicted) {
              // move
              // add
              kNum.text += num.text;
              num.text = 0;
              // add score
              this.score += kNum.text;
              kNum.hasConflicted = true;
              continue;
            }
          }
        }
      }
    }
    this.updateBoard();
    return true;
  }

  /**
   * 向下移动
   *
   * @private
   * @returns {boolean}
   * @memberof My2048Component
   */
  private moveDown(): boolean {
    if (!this.support.canMoveDown(this.board)) {
      return false;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        const num: any = this.board[j][i];
        if (num.text !== 0) {
          for (let k = 3; k > j; k--) {
            const kNum: any = this.board[k][i];
            const noBlockVertical: boolean = this.support.noBlockVertical(i, j, k, this.board);
            if (kNum.text === 0 && noBlockVertical) {
              // move
              kNum.text = num.text;
              num.text = 0;
              continue;
            } else if (num.text === kNum.text && noBlockVertical && !kNum.hasConflicted) {
              // move
              // add
              kNum.text += num.text;
              num.text = 0;
              // add score
              this.score += kNum.text;
              kNum.hasConflicted = true;
              continue;
            }
          }
        }
      }
    }
    this.updateBoard();
  }

}
