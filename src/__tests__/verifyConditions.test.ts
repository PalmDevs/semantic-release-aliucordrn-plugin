import expectJS = require('expect');
import uvu = require('uvu');
import lifecycles = require('../');

const { test } = uvu;
const { expect } = expectJS;

test("should throw error when manifest doesn't exist", () => {
    expect(() => {
        lifecycles.verifyConditions({
            manifestFile: 'this-does-not-exist.json',
        });
    }).toThrowError(/Cannot find manifest file/);
});

test('should not throw error when manifest exists', () => {
    expect(() => {
        lifecycles.verifyConditions({
            manifestFile: 'src/__tests__/manifest.valid.json',
        });
    }).not.toThrowError();
});

test.run();
