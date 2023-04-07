import expectJS = require('expect');
import uvu = require('uvu');
import lifecycles = require('../');
import type { Config, Context } from 'semantic-release';

const { test } = uvu;
const { expect } = expectJS;

const context = {
    logger: {
        log: () => {},
        debug: () => {},
    },
} as unknown as Config & Context;
const contextWithCwd = { ...context, cwd: 'src/__tests__' };

test("should throw error when manifest doesn't exist", () => {
    expect(() => {
        lifecycles.verifyConditions(
            {
                manifestFile: 'this-does-not-exist.json',
            },
            contextWithCwd
        );
    }).toThrowError();
});

test('should throw an error when manifest does not exist in cwd', () => {
    expect(() => {
        lifecycles.verifyConditions(
            {
                manifestFile: 'manifest.json',
            },
            context
        );
    }).toThrowError();
});

test('should not throw error when manifest exists', () => {
    expect(() => {
        lifecycles.verifyConditions(
            {
                manifestFile: 'manifest.valid.json',
            },
            contextWithCwd
        );
    }).not.toThrowError();
});

test('should not throw an error when manifest exists when using absolute paths', () => {
    expect(() => {
        lifecycles.verifyConditions(
            {
                manifestFile: 'src/__tests__/manifest.valid.json',
            },
            context
        );
    }).not.toThrowError();
});

test.run();
