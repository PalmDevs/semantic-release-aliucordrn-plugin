import fs = require('fs');
import type { Context } from 'semantic-release';
import type PluginConfig from '../types/PluginConfig.js';

const prepare = function prepare(
    { manifestFile }: Required<PluginConfig>,
    context: Context
) {
    const { logger } = context;
    logger.log('Loading manifest file: %s', manifestFile);

    const manifest = fs.readFileSync(manifestFile, 'utf8');

    logger.debug('File contents:\n%s', manifest);

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
    logger.debug('Writing to file %s', manifestFile);

    fs.writeFileSync(manifestFile, newManifest, 'utf8');
};

prepare.VersionFieldRegExp = /"version"\s*:\s*"(.+)"/;

export = prepare;
