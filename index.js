function boldColor(num) {
    // Let `num` be a number from 1 to 7
    let _num = num % 7;
    return `\u001b[1m\u001b[${91 + _num}m`;
}

(async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const chalk = (await import('chalk')).default;

    /*
     * Wait...
     * What if I wanted to center text
     * but I was too lazy to do basic math?
     */
    const center = require('center-align');
    // lol

    readline.question(`${chalk.gray('Enter the names of the players at your table in clockwise order, separated by commas:')}\n> \u001b[1m`, (ans) => {
        let names = ans
            .split(',')
            .map((name) => name.trim())
            .filter((name) => name !== '')
        process.stdout.write('\u001b[0m\u001bc')

        // Render names on screen.
        let terminalWidth = process.stdout.columns,
            blockWidthPerPerson = terminalWidth / names.length,
            centeredNames = names.map((name) => center(name, blockWidthPerPerson)),
            places$ = centeredNames.map((centeredName) => [centeredName.trim(), centeredName.match(/^( *)/g)[0].length]),
            places = Object.fromEntries(places$),
            playerString = centeredNames.map((name, i) => `${boldColor(i)}${name}`).join(''),
            healthPointString = names.map((name) => center('20 HP ', blockWidthPerPerson)).join(''),
            initialString = `${playerString}\n\u001b[0m${healthPointString}`;
        process.stdout.cursorTo(0, Math.floor((process.stdout.rows - 2) / 2))
        process.stdout.write(initialString);

        // Render box.
        process.stdout.cursorTo(0, 0);
        process.stdout.write('\u2554' + '\u2550'.repeat(process.stdout.columns - 2) + '\u2557');
        for (let i = 1; i < process.stdout.rows - 1; i++) {
            process.stdout.cursorTo(0, i);
            process.stdout.write('\u2551');
            process.stdout.cursorTo(process.stdout.columns - 1, i);
            process.stdout.write('\u2551');
        }
    })
})();