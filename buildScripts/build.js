/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

//declare we are running node in PRODUCTION MODE
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified build for production, please wait...'));

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    //ouput stats, warns, errors to console.
    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }
    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the following warnings:'));
        jsonStats.errors.map(error => console.log(chalk.yellow(error)));
    }

    console.log(`Webpack stats: ${stats}`);

    //If we got this far the build succeeded!
    console.log(chalk.green('Your app has been build for production and written to /dist'));

    return 0;
});
