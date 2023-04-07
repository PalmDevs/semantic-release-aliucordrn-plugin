import fs = require('fs');
import path = require('path');
import type { Config, Context } from 'semantic-release';
import type PluginConfig from '../types/PluginConfig.js';

export = function verifyConditions(
    pluginConfig: PluginConfig | null | undefined,
    context: Config & Context
) {
    const { logger } = context;

    if (!pluginConfig) pluginConfig = {};
    pluginConfig.manifestFile = path.join(
        context.cwd ?? process.cwd(),
        pluginConfig.manifestFile ?? 'manifest.json'
    );

    logger.log(
        'Checking if manifest file exists: %s',
        pluginConfig.manifestFile
    );

    if (!fs.existsSync(pluginConfig.manifestFile))
        throw new AggregateError([
            `Cannot find manifest file: ${pluginConfig.manifestFile}`,
        ]);
};
