const { calculateGoals, calculateMachines } = require('./src/itemCalculator');
const recipes = require('./data/recipes.json');

let goals = [
    { item: "Smart Plating", ipm: 2 },
    { item: "Versatile Framework", ipm: 5 },
    { item: "Automated Wiring", ipm: 2.5 }
];

let goalMap = calculateGoals(goals, recipes);

console.log(goalMap);

let machines = calculateMachines(goalMap, recipes);

console.log(machines);
