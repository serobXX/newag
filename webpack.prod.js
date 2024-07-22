const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common');
const sizeLimit = require('size-limit');
const filePlugin = require('@size-limit/file');

const calculateSizeLimit = (result, file, outputPath, errArray) => {
  const kbSize = (result[0].size / 1024).toFixed(1);
  const chunkLimit = process.env['NODE_CHUNK_LIMIT_SIZE'];
  if (!chunkLimit) {
    return;
  }
  if (kbSize > Number(chunkLimit)) {
    console.error('error');
    errArray.push({
      route: `${outputPath}/${file}`,
      chinkSize: kbSize,
      sizeDifference: (kbSize - chunkLimit).toFixed(1),
    });
  }
};

module.exports = () => {
  const sizeLimitsFailes = [];
  return merge(baseConfig, {
    mode: 'production',
    plugins: [
      {
        apply: (compiler) => {
          return compiler.hooks.assetEmitted.tap(
            'AssetEmitPlugin',
            async (file, { outputPath }) => {
              if (file.match(/^^[a-zA-Z0-9]*\.js$/g)) {
                await sizeLimit([filePlugin], {
                  checks: [{ files: [`${outputPath}/${file}`], gzip: false }],
                })
                  .then((result) => calculateSizeLimit(result, file, outputPath, sizeLimitsFailes))
                  .then(() => {
                    if (sizeLimitsFailes.length) {
                      sizeLimitsFailes.forEach(({ route, chinkSize, sizeDifference }) => {
                        console.error(
                          `${route} (${chinkSize} kB) is ${sizeDifference} kb over limit`,
                        );
                      });
                      throw new Error('Chunk sizes exception');
                    }
                  });
              }
            },
          );
        },
      },
    ],
  });
};
