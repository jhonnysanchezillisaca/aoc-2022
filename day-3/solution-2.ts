interface Rucksack {
  items: string[];
}

const input = await Deno.readTextFile("./day-3/input.txt");

const rucksacksRaw = input.trim().split(/\n/g);

const priorityItemByGroup = getPriorityItemByGroups(
  rucksacksRaw.map((r) => convertToRucksack(r)),
);
const totalScore = priorityItemByGroup.map((i) => getItemScore(i)).reduce((
  p,
  n,
) => p + n);

console.log({ priorityItemByGroup, totalScore });


function getPriorityItemByGroups(ruckSacks: Rucksack[]): string[] {
  console.log(ruckSacks);
  const results: string[] = [];
  for (let index = 0; index < ruckSacks.length; index += 3) {
    console.log(`iterating with index ${index}`);
    const allItems1 = ruckSacks[index].items;
    const allItems2 = ruckSacks[index + 1].items;
    const allItems3 = ruckSacks[index + 2].items;
    console.table({ allItems1, allItems2, allItems3 });

    const repeatedItemInGroup = getRepeatedItemInGroup(
      allItems1,
      allItems2,
      allItems3,
    );
    if (repeatedItemInGroup) {
      results.push(repeatedItemInGroup);
    }
  }

  return results;
}

function getRepeatedItemInGroup(
  allItems1: string[],
  allItems2: string[],
  allItems3: string[],
): string | null {
  for (const item1 of allItems1) {
    const repeatedElementFoundOrUndefined2 = allItems2.find(
      (item2) => item2 === item1,
    );
    const repeatedElementFoundOrUndefined3 = allItems3.find((item3) =>
      item3 === item1
    );

    if (
      repeatedElementFoundOrUndefined2 && repeatedElementFoundOrUndefined3
    ) {
      return item1;
    } else {
      console.log(
        `item ${item1} not found on all sacks`,
      );
    }
  }
  return null;
}

function getItemScore(item: string): number {
  const allItems = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (!item || item.length > 1) {
    return 0;
  }

  const index = [...allItems].findIndex((c) => c === item);

  // if not found returns 0
  return index + 1;
}

function convertToRucksack(rucksackRaw: string): Rucksack {
  return { items: [...rucksackRaw] };
}
