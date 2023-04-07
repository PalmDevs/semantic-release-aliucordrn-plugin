import expectJS = require('expect');
import fs = require('fs');
import uvu = require('uvu');
import type { Context } from 'semantic-release';
import lifecycles = require('../');

const { test } = uvu;
const { copyFileSync, readFileSync, rmSync } = fs;
const { expect } = expectJS;

const context = {
    nextRelease: {
        version: '2.0.0',
    },
    logger: {
        log: () => {},
        debug: () => {},
    },
} as unknown as Context;

test('should throw error when manifest is invalid', () => {
    expect(() => {
        lifecycles.prepare(
            {
                manifestFile: 'src/__tests__/manifest.invalid.json',
            },
            context
        );
    }).toThrowError();
});

test('should not throw error when manifest is valid', () => {
    copyFileSync(
        'src/__tests__/manifest.valid.json',
        'src/__tests__/manifest.valid-testing.json'
    );
    expect(() => {
        lifecycles.prepare(
            {
                manifestFile: 'src/__tests__/manifest.valid-testing.json',
            },
            context
        );
    }).not.toThrowError();
});

test(`should update manifest's version field`, () => {
    const content = readFileSync(
        'src/__tests__/manifest.valid-testing.json',
        'utf8'
    );
    rmSync('src/__tests__/manifest.valid-testing.json');
    expect(content).toMatch(/"version"\s*:\s*"2.0.0"/);
});

test.run();
