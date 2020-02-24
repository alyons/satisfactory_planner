const rawMaterials = ["Iron Ore", "Copper Ore", "Coal"];

function splitInput(inputString) {
    let index = inputString.indexOf(' ');
    let amount = parseFloat(inputString.substring(0, index));
    let material = inputString.substring(index + 1);
    return { material, amount };
}

function calculateItemThroughput(item, desiredThroughput, recipes, throughputMap) {
    if (throughputMap.get(item) == undefined) throughputMap.set(item, 0);
    let recipe = recipes.find(r => r.name === item);
    let inputs = recipe.inputs.map(i => splitInput(i));
    let adjustment = desiredThroughput / recipe.itemsPerMinute;
    inputs.forEach(({ material, amount }) => {
        if (throughputMap.get(material) == undefined) throughputMap.set(material, 0);
        let needThroughput = recipe.itemsPerMinute / recipe.output * amount * adjustment;
        let currentAmount = throughputMap.get(material) + needThroughput;

        if (rawMaterials.indexOf(material) === -1) {
            calculateItemThroughput(material, needThroughput, recipes, throughputMap);
        } else {
            throughputMap.set(material, currentAmount);
        }
    });

    let current = throughputMap.get(item) + desiredThroughput;
    throughputMap.set(item, current);
}

function calculateGoals(goals, recipes) {
    let finalMap = new Map();

    goals.forEach(({ item, ipm }) => {
        let partialMap = new Map();
        calculateItemThroughput(item, ipm, recipes, partialMap);
        let keys = [...partialMap.keys()];
        keys.forEach(key => {
            if (finalMap.get(key) == undefined) finalMap.set(key, 0);
            let update = finalMap.get(key) + partialMap.get(key);
            finalMap.set(key, update);
        });
    });

    return finalMap;
}

function calculateMachines(goalMap, recipes) {
    let output = [];

    let items = [...goalMap.keys()];
    items.forEach(item => {
        let subOutput = item + ' needs ';
        let recipe = recipes.find(r => r.name === item);
        if (recipe === undefined) {
            let machines = Math.ceil(goalMap.get(item) / 30);
            subOutput += machines + ' of miner(s).';
        } else {
            let machines = Math.ceil(goalMap.get(item) / recipe.itemsPerMinute);
            if (item.includes('Ingot')) {
                if (recipe.inputs.count > 1) {
                    subOutput += machines + ' of foundary(s)';
                } else {
                    subOutput += machines + ' of smelter(s)';
                }
            } else {
                if (recipe.inputs.count > 2) {
                    subOutput += machines + ' of manufacturer(s)'
                } else if (recipe.inputs.count == 2) {
                    subOutput += machines + ' of assembler(s)';
                } else {
                    subOutput += machines + ' of constructor(s)';
                }
            }
        }
        output.push(subOutput);
    });

    return output;
}

module.exports = {
    calculateItemThroughput,
    calculateGoals,
    calculateMachines
};
