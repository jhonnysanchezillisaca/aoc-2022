console.log('hi from deno');

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
console.table(maxCalories);
