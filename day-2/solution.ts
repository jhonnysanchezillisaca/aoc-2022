// A -> rock <- X 1
// B -> paper <- Y 2
// C -> scissors <-Z 3
// lost -> 0; draw -> 3;  win -> 6;

type Symbols = "rock" | "paper" | "scissors";
interface Round {
  oponent: Symbols;
  me: Symbols;
}

const input = await Deno.readTextFile("./day-2/input.txt");

const roundsRaw = input.trim().split(/\n/g);
const rounds = roundsRaw.map(
  (raw) => ({ oponent: getSymbol(raw[0]), me: getSymbol(raw[2]) } as Round),
);

const resultsByRound = rounds.map((r) => calculateScore(r));

console.log(resultsByRound);
console.log(resultsByRound.reduce((p, c) => p + c));

function getSymbol(input: string) {
  switch (input) {
    case "A":
    case "X":
      return "rock";
    case "B":
    case "Y":
      return "paper";
    case "C":
    case "Z":
      return "scissors";
    default:
      break;
  }
}

function calculateScore(round: Round) {
  let score = 0;
  score += getSymbolScore(round.me);

  // draw
  if (isDraw(round)) {
    score += 3;
  } else if (isWin(round)) {
    score += 6;
  }

  return score;
}

function isDraw(round: Round) {
  return round.oponent === round.me;
}

function isWin(round: Round) {
  return round.oponent === "rock" && round.me === "paper" ||
    round.oponent === "paper" && round.me === "scissors" ||
    round.oponent === "scissors" && round.me === "rock";
}

function getSymbolScore(symbol: Symbols) {
  switch (symbol) {
    case "rock":
      return 1;
    case "paper":
      return 2;
    case "scissors":
      return 3;
    default:
      return 0;
  }
}
