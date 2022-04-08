class Matrix {
  constructor(matrix) {
    this.array = matrix;
  }
  random() {
    for(let x = 0; x < this.array.length;x++) {
      for(let y = 0; y < this.array[0].length; y++) {
        this.array[x][y] = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
      }
    }
  }
  static add(matrix1, matrix2) {
    if(matrix1.array.length !== matrix2.array.length || matrix1.array[0].length !== matrix2.array[0].length) {
      console.error("Incorrect sizes while adding.");
      return;
    }
    var addedMatrix = new Matrix([[1]]);
    for(let x = 0; x < matrix1.array.length;x++) {
      addedMatrix.array[x] = [];
      for(let y = 0; y < matrix1.array[0].length;y++) {
        addedMatrix.array[x][y] = matrix1.array[x][y] + matrix2.array[x][y];
      }
    }
    return addedMatrix;
  }
  static multiply(matrix1, matrix2) {
    if(matrix1.array[0].length !== matrix2.array.length) {
      console.error("Incorrect sizes while multiplying.");
      return;
    }
    var multipliedMatrix = new Matrix([]);
    for(let row = 0; row < matrix1.array.length; row++) {
    multipliedMatrix.array[row] = [];
      for(let column = 0; column < matrix2.array[0].length; column++) {
        multipliedMatrix.array[row][column] = 0;
        for(let iteration = 0; iteration < matrix1.array[0].length; iteration++) {
          multipliedMatrix.array[row][column] += matrix1.array[row][iteration] * matrix2.array[iteration][column];
        }
      }
    }
    return multipliedMatrix;
  }
  static scale(matrix, float) {
    let scaledMatrix = new Matrix([]);
    for(let x = 0; x < matrix.array.length; x++) {
      scaledMatrix.array[x] = [];
      for(let y = 0; y < matrix.array[0].length; y++) {
        scaledMatrix.array[x][y] = matrix.array[x][y] * float;
      }
    }
    return scaledMatrix;
  }
}
