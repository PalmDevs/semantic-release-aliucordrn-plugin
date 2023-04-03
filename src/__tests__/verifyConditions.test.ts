import { expect } from 'expect';
import { test } from 'uvu';
import verifyConditions from '../lifecycles/verifyConditions.js';

test("should throw error when manifest doesn't exist", () => {
    expect(() => {
        verifyConditions({
            manifestFile: 'this-does-not-exist.json',
        });
    }).toThrowError(/Cannot find manifest file/);
});

test('should not throw error when manifest exists', () => {
    expect(() => {
        verifyConditions({
            manifestFile: 'src/__tests__/manifest.valid.json',
        });
    }).not.toThrowError();
});

test.run();
