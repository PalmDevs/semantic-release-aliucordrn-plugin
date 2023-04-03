import { readFileSync, writeFileSync } from 'fs';
import type { Context } from 'semantic-release';
import type PluginConfig from '../types/PluginConfig.js';

export default function prepare(
    { manifestFile }: Required<PluginConfig>,
    context: Context
) {
    const errors = [];

    const { logger } = context;
    logger.log('Loading manifest file: %s', manifestFile);

    try {
        const manifest = readFileSync(manifestFile, 'utf8');
        const versionField = manifest.match(VersionFieldRegExp);
        if (!versionField)
            throw new Error(`Cannot find version field in manifest file`);

        const [wholeString, version] = versionField;
        const newVersionFieldString = wholeString.replace(
            `"${version}"`,
            `"${context.nextRelease!.version}"`
        );

        const newManifest = manifest.replace(
            wholeString,
            newVersionFieldString
        );
        writeFileSync(manifestFile, newManifest, 'utf8');
    } catch (err) {
        errors.push(err);
    }

    if (errors.length) throw new AggregateError(errors);
}

export const VersionFieldRegExp = /"version"\s*:\s*"(.+)"/;
