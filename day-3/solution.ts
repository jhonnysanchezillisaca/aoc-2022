interface Rucksack {
  left: string;
  right: string;
}

const input = await Deno.readTextFile("./day-3/input.txt");

const rucksacksRaw = input.trim().split(/\n/g);

const ruckSacks = rucksacksRaw.map((r) => convertToRucksack(r));

console.log({ ruckSacks });

const repeatedItemsPerRucksack = ruckSacks.map((r) => findFirstRepeatedItem(r));
const totalPriorityScore = repeatedItemsPerRucksack.map((i) => getItemScore(i!))
  .reduce((p, n) => p + n);

console.log({ totalPriorityScore });

function getItemScore(item: string): number {
  const allItems = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (!item || item.length > 1) {
    return 0;
  }

  const index = [...allItems].findIndex((c) => c === item);

  // if not found returns 0
  return index + 1;
}

function findFirstRepeatedItem(ruckSack: Rucksack): string | null {
  for (const leftItem of ruckSack.left) {
    const repeatedElementFoundOrUndefined = [...ruckSack.right].find(
      (rightItem) => rightItem === leftItem,
    );
    if (repeatedElementFoundOrUndefined) {
      return repeatedElementFoundOrUndefined;
    }
  }
  return null;
}

function convertToRucksack(rucksackRaw: string): Rucksack {
  const left = rucksackRaw.slice(0, rucksackRaw.length / 2);
  const right = rucksackRaw.slice(
    rucksackRaw.length / 2,
    rucksackRaw.length,
  );

  return { left, right };
}
