import { expect } from 'expect';
import { copyFileSync, readFileSync, rmSync } from 'fs';
import { test } from 'uvu';
import type { Context } from 'semantic-release';
import prepare from '../lifecycles/prepare.js';

const context = {
    nextRelease: {
        version: '2.0.0',
    },
    logger: {
        log: () => {},
    },
} as unknown as Context;

test('should throw error when manifest is invalid', () => {
    expect(() => {
        prepare(
            {
                manifestFile: 'src/__tests__/manifest.invalid.json',
            },
            context
        );
    }).toThrowError(/Cannot find version field in manifest file/);
});

test('should not throw error when manifest is valid', () => {
    copyFileSync(
        'src/__tests__/manifest.valid.json',
        'src/__tests__/manifest.valid-testing.json'
    );
    expect(() => {
        prepare(
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
