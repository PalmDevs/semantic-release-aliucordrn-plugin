import { existsSync } from 'fs';
import { resolve as resolvePath } from 'path';
import type PluginConfig from '../types/PluginConfig.js';

export default function verifyConditions(
    pluginConfig: PluginConfig | null | undefined
) {
    const errors = [];

    if (!pluginConfig) pluginConfig = {};
    pluginConfig.manifestFile = resolvePath(
        process.cwd(),
        pluginConfig.manifestFile ?? 'manifest.json'
    );

    if (!existsSync(pluginConfig.manifestFile))
        errors.push(
            new Error(`Cannot find manifest file: ${pluginConfig.manifestFile}`)
        );
    if (errors.length) throw new AggregateError(errors);
}
