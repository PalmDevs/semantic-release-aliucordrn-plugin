import fs = require('fs');
import path = require('path');
import type { Config, Context } from 'semantic-release';
import type PluginConfig from '../types/PluginConfig.js';

const prepare = function prepare(
    pluginConfig: PluginConfig | null | undefined,
    context: Config & Context
) {
    const { logger } = context;
    const resolvedManifestFile = path.join(
        context.cwd ?? process.cwd(),
        pluginConfig?.manifestFile ?? 'manifest.json'
    );

    logger.log('Loading manifest file: %s', resolvedManifestFile);

    const manifest = fs.readFileSync(resolvedManifestFile, 'utf8');

    logger.debug('Manifest file contents:\n%s', manifest);

    const versionField = manifest.match(prepare.VersionFieldRegExp);
    if (!versionField)
        throw new AggregateError([
            `Cannot find version field in manifest file`,
        ]);

    const [wholeString, version] = versionField;
    const newVersionFieldString = wholeString.replace(
        `"${version}"`,
        `"${context.nextRelease!.version}"`
    );

    const newManifest = manifest.replace(wholeString, newVersionFieldString);

    logger.debug('New file contents:\n%s', newManifest);
    logger.debug('Writing to file %s', resolvedManifestFile);

    fs.writeFileSync(resolvedManifestFile, newManifest, 'utf8');
};

prepare.VersionFieldRegExp = /"version"\s*:\s*"(.+)"/;

export = prepare;
