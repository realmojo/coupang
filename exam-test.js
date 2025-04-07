const A = [4, 35, 80, 123, 12345, 44, 8, 5];
const K = 10;

const getLine = (A, K, len, lastLen) => {
  process.stdout.write("+");

  // K가 A배열보다 크면 작은 값으로 맞춰줘야함
  const length = K > A.length ? A.length : K;

  // 마지막줄 길이가 있으면 강제로 고정 그렇지 않을경우 기본 길이값으로 고정
  const MaxLength = lastLen ? lastLen : length;
  for (let i = 0; i < MaxLength; i++) {
    for (let j = 0; j < len; j++) {
      process.stdout.write("-");
    }
    process.stdout.write("+");
  }
  process.stdout.write("\n");
};

function solution(A, K) {
  // 배열에서 최대값 찾기
  const maxNumber = Math.max(...A);

  // 최대값의 길이
  const maxNumberLength = maxNumber.toString().length;

  // 배열의 길이
  const ArrayLength = A.length;

  // 빈공간 길이
  let emptyLength = 0;

  // 마지막 줄 나머지 길이
  let rest = 0;

  // 상단의 길이를 먼저 그린다.
  getLine(A, K, maxNumberLength, rest);
  for (let i = 0; i < ArrayLength; i++) {
    if (i === 0 || i % K === 0) {
      process.stdout.write("|");
    }

    // 최대 길이에서 현재 값의 길이를 빼서 빈 값을 구한다.
    emptyLength = maxNumberLength - A[i].toString().length;
    for (let j = 0; j < emptyLength; j++) {
      process.stdout.write(" ");
    }
    process.stdout.write(A[i].toString());
    process.stdout.write("|");

    // 하단의 줄을 그린다.
    if (i % K === K - 1) {
      process.stdout.write("\n");
      getLine(A, K, maxNumberLength, rest);
    } else if (i === ArrayLength - 1) {
      process.stdout.write("\n");
      rest = ArrayLength % K;
      getLine(A, K, maxNumberLength, rest);
    }
  }
}

solution(A, K);
