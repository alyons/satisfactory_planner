const { calculateItemThroughput } = require('../src/itemCalculator');

const recipes0 = require('./recipes0.json');
const fullRecipes = require('../data/recipes.json');

describe('Calculate Throughput', () => {
    let store;
    beforeEach(() => {
        store = new Map();
    });

    describe('Recipes 0', () => {
        test('Create 120 Iron Ingots per Minute', () => {
            calculateItemThroughput('Iron Ingot', 120, recipes0, store);
            expect(store.get('Iron Ore')).toEqual(120);
        });
    });

    describe('Iron Plate', () => {
        test('Create 20 Iron Plate per Minute', () => {
            calculateItemThroughput('Iron Plate', 20, fullRecipes, store);
            console.log(store);
            expect(store.get('Iron Ingot')).toEqual(30);
            expect(store.get('Iron Ore')).toEqual(30);
        });
    });

});