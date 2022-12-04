
const input = await Deno.readTextFile("./day-1/input.txt");

// split in groups when there's a blank line
const groups = input.trim().split(/\n\n/g);

const caloriesPerElf = [] as Array<Array<number>>;

groups.forEach(g => {
    // convert each group to a list of calories per elf in number
    const values = g.split(/\n/g).map(value => parseInt(value));
    caloriesPerElf.push(values);
});

const totalCaloriesPerElf = caloriesPerElf.map(calories => calories.reduce((previous, current) => previous + current));
const maxCalories = Math.max(...totalCaloriesPerElf);
console.table(`Elf with most calories has ${maxCalories} calories`);

// sort array in reverse order
const reverseSortedTotalCaloriesPerElf = totalCaloriesPerElf.sort((a, b) => b - a);
const totalCaloriesTopThreeElves = reverseSortedTotalCaloriesPerElf.slice(0, 3).reduce((previous, current) => previous + current);
console.log(`top three elves have ${totalCaloriesTopThreeElves} calories`);