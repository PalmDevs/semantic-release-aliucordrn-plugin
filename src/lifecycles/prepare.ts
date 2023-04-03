import fs = require('fs');
import type { Context } from 'semantic-release';
import type PluginConfig from '../types/PluginConfig.js';

const { readFileSync, writeFileSync } = fs;
const prepare = function prepare(
    { manifestFile }: Required<PluginConfig>,
    context: Context
) {
    const { logger } = context;
    logger.log('Loading manifest file: %s', manifestFile);

    const manifest = readFileSync(manifestFile, 'utf8');
    const versionField = manifest.match(prepare.VersionFieldRegExp);
    if (!versionField)
        throw new Error(`Cannot find version field in manifest file`);

    const [wholeString, version] = versionField;
    const newVersionFieldString = wholeString.replace(
        `"${version}"`,
        `"${context.nextRelease!.version}"`
    );

    const newManifest = manifest.replace(wholeString, newVersionFieldString);
    writeFileSync(manifestFile, newManifest, 'utf8');
};

prepare.VersionFieldRegExp = /"version"\s*:\s*"(.+)"/;

export = prepare;
