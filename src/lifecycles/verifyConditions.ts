import fs = require('fs');
import path = require('path');
import type PluginConfig from '../types/PluginConfig.js';

const { existsSync } = fs;
const { resolve: resolvePath } = path;

export = function verifyConditions(
    pluginConfig: PluginConfig | null | undefined
) {
    if (!pluginConfig) pluginConfig = {};
    pluginConfig.manifestFile = resolvePath(
        process.cwd(),
        pluginConfig.manifestFile ?? 'manifest.json'
    );

    if (!existsSync(pluginConfig.manifestFile))
        throw new Error(
            `Cannot find manifest file: ${pluginConfig.manifestFile}`
        );
};
