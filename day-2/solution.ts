// A -> rock  1
// B -> paper 2
// C -> scissors 3
// X -> lose; Y -> draw; Z -> win;
// lost -> 0; draw -> 3;  win -> 6;

type Symbols = "rock" | "paper" | "scissors";
type Strategy = "lose" | "draw" | "win";
interface Round {
  oponent: Symbols;
  strategy: Strategy;
}

const input = await Deno.readTextFile("./day-2/input.txt");

const roundsRaw = input.trim().split(/\n/g);
const rounds = roundsRaw.map(
  (
    raw,
  ) => ({ oponent: getSymbol(raw[0]), strategy: getStrategy(raw[2]) } as Round),
);

const resultsByRound = rounds.map((r) => calculateScore(r));

console.log(resultsByRound);
console.log(resultsByRound.reduce((p, c) => p + c));

function calculateScore(round: Round) {
  let score = 0;
  score += getSymbolStrategyScore(round);

  // draw
  if (round.strategy == "draw") {
    score += 3;
  } else if (round.strategy === "win") {
    score += 6;
  }

  return score;
}

function getSymbolStrategyScore(round: Round): number {
  // if win, when rock then paper, when paper then scissors, when scissors then rock
  // if lose, when rock then scissors, when scissors then paper, when paper then rock
  // if draw, same as opponent

  if (round.strategy === "win") {
    switch (round.oponent) {
      case "rock":
        return getSymbolScore("paper");
      case "paper":
        return getSymbolScore("scissors");
      case "scissors":
        return getSymbolScore("rock");
      default:
        break;
    }
  } else if (round.strategy === "lose") {
    switch (round.oponent) {
      case "rock":
        return getSymbolScore("scissors");
      case "paper":
        return getSymbolScore("rock");
      case "scissors":
        return getSymbolScore("paper");
      default:
        break;
    }
  } else if (round.strategy === "draw") return getSymbolScore(round.oponent);

  return 0;
}

function getSymbolScore(symbol: Symbols): number {
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

function getSymbol(input: string) {
  switch (input) {
    case "A":
      return "rock";
    case "B":
      return "paper";
    case "C":
      return "scissors";
    default:
      break;
  }
}

function getStrategy(input: string) {
  switch (input) {
    case "X":
      return "lose";
    case "Y":
      return "draw";
    case "Z":
      return "win";
    default:
      break;
  }
}
