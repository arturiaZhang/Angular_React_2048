export class Support {

    /**
     * 计算div上边距
     *
     * @param {*} i 第几行
     * @memberof Support
     */
    public getPosTop(i: number): number {
        return 20 + i * 120;
    }

    /**
     * 计算div左边距
     *
     * @param {*} j 第几列
     * @memberof Support
     */
    public getPosLeft(j: number): number {
        return 20 + j * 120;
    }

    /**
     * 获取背景颜色
     *
     * @param {number} num
     * @returns
     * @memberof Support
     */
    public getNumberBackgroundColor(num: number): string {
        switch (num) {
            case 2:
                return '#eee4da';
            case 4:
                return '#ede0c8';
            case 8:
                return '#f2b179';
            case 16:
                return '#f59563';
            case 32:
                return '#f67c5f';
            case 64:
                return '#f65e3b';
            case 128:
                return '#edcf72';
            case 256:
                return '#edcc61';
            case 512:
                return '#9c0';
            case 1024:
                return '#33b5e5';
            case 2048:
                return '#09c';
            case 4096:
                return '#a6c';
            case 8192:
                return '#93c';
        }
        return 'black';
    }

    /**
     * 获取数值颜色
     *
     * @param {number} num
     * @returns {string}
     * @memberof Support
     */
    public getNumberColor(num: number): string {
        if (num <= 4) {
            return '#776e65';
        }
        return 'white';
    }

    /**
     * 判断是否还有空间
     *
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public noSpace(board: any[]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const num: any = board[i][j];
                if (num.text === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 是否可以移动
     *
     * @param {*} board
     * @returns {boolean}
     * @memberof Support
     */
    public noMove(board: any): boolean {
        if (this.canMoveLeft(board) || this.canMoveRight(board) || this.canMoveUp(board) || this.canMoveDown(board)) {
            return false;
        }
        return true;
    }

    /**
     * 根据当前局势，判断是否可以向左移动
     *
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public canMoveLeft(board: any[]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                const num: any = board[i][j];
                if (num.text !== 0) {
                    const pre: any = board[i][j - 1];
                    if (pre.text === 0 || pre.text === num.text) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 根据当前局势，判断是否可以向右移动
     *
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public canMoveRight(board: any[]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                const num: any = board[i][j];
                if (num.text !== 0) {
                    const pre: any = board[i][j + 1];
                    if (pre.text === 0 || pre.text === num.text) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 根据当前局势，判断是否可以向上移动
     *
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public canMoveUp(board: any[]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                const num: any = board[j][i];
                if (num.text !== 0) {
                    const pre: any = board[j - 1][i];
                    if (pre.text === 0 || pre.text === num.text) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 根据当前局势，判断是否可以向下移动
     *
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public canMoveDown(board: any[]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                const num: any = board[j][i];
                if (num.text !== 0) {
                    const pre: any = board[j + 1][i];
                    if (pre.text === 0 || pre.text === num.text) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 判断当前给予左右位置是否可以移动
     *
     * @param {number} row
     * @param {number} col1
     * @param {number} col2
     * @param {any[]} board
     * @returns {boolean}
     * @memberof Support
     */
    public noBlockHorizontal(row: number, col1: number, col2: number, board: any[]): boolean {
        for (let i = col1 + 1; i < col2; i++) {
            const num: any = board[row][i];
            if (num.text !== 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断当前给予上下位置是否可以移动
     *
     * @param {number} col
     * @param {number} row1
     * @param {number} row2
     * @param {*} board
     * @returns {boolean}
     * @memberof Support
     */
    public noBlockVertical(col: number, row1: number, row2: number, board): boolean {
        for (let i = row1 + 1; i < row2; i++) {
            const num: any = board[i][col];
            if (num.text !== 0) {
                return false;
            }
        }
        return true;
    }

}
