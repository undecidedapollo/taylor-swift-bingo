const fs = require('fs');

const taylorSwiftSongs = [
    "Picture to Burn", "The Outside", "I'm Only Me When I'm With You", "Mary's Song",
    "Fearless", "The Other Side of the Door", "Breathe", "The Way I Loved You",
    "Mr. Perfectly Fine", "Back to December", "Mine", "Speak Now", "Electric Touch",
    "Timeless", "The Moment I Knew", "Red", "Begin Again", "I Knew You Were Trouble",
    "Come Back...Be Here", "Blank Space", "Style", "Say Don't Go", "Clean", "\"Slut!\"",
    "Don't Blame Me", "This Is Why We Can't Have Nice Things", "Look What You Made Me Do",
    "Gorgeous", "I Forgot That You Existed", "London Boy", "Daylight",
    "All Of The Girls You Loved Before", "Cornelia Street", "The 1", "August",
    "Invisible String", "My Tears Ricochet", "Tolerate It", "Marjorie",
    "'Tis The Damn Season", "Evermore", "Maroon", "Karma", "Paris", "Question…?",
    "Hits Different", "The Black Dog", "The Tortured Poets Department", "Guilty as Sin?",
    "But Daddy I Love Him", "I'm Gonna Get You Back"
];

const pattern = [
    'O', 'X', 'O', 'O', 'O',
    'O', 'X', 'X', 'X', 'O',
    'O', 'X', 'I', 'O', 'O',
    'O', 'X', 'X', 'X', 'O',
    'O', 'X', 'O', 'O', 'O'
];

function getWeightedRandomSong(availableSongs, songUsageCount, songPositionCount, position) {
    const totalWeight = availableSongs.reduce((sum, song) => {
        const usageWeight = 1 / (songUsageCount[song] || 1);
        const positionWeight = 1 / (songPositionCount[`${song}-${position}`] || 1);
        return sum + (usageWeight * positionWeight);
    }, 0);
    
    let random = Math.random() * totalWeight;
    
    for (const song of availableSongs) {
        const usageWeight = 1 / (songUsageCount[song] || 1);
        const positionWeight = 1 / (songPositionCount[`${song}-${position}`] || 1);
        const weight = usageWeight * positionWeight;
        if (random < weight) return song;
        random -= weight;
    }
    
    return availableSongs[availableSongs.length - 1];
}

function generateBoards(numBoards) {
    const boards = [];
    let songUsageCount = {};
    let songPositionCount = {};
    let lastBoardSongs = new Set();

    for (let boardNum = 0; boardNum < numBoards; boardNum++) {
        const board = [];
        const availableSongs = taylorSwiftSongs.filter(song => !lastBoardSongs.has(song));
        const newBoardSongs = new Set();

        pattern.forEach((cell, index) => {
            if (cell === 'O') {
                if (availableSongs.length === 0) {
                    availableSongs.push(...taylorSwiftSongs.filter(song => !newBoardSongs.has(song)));
                }
                const song = getWeightedRandomSong(availableSongs, songUsageCount, songPositionCount, index);
                const songIndex = availableSongs.indexOf(song);
                availableSongs.splice(songIndex, 1);
                
                board.push(song);
                newBoardSongs.add(song);
                songUsageCount[song] = (songUsageCount[song] || 0) + 1;
                songPositionCount[`${song}-${index}`] = (songPositionCount[`${song}-${index}`] || 0) + 1;
            }
        });

        boards.push(board);
        lastBoardSongs = newBoardSongs;
    }

    return boards;
}

function simulateBingo(boards) {
    const songs = [...taylorSwiftSongs];
    let songsDrawn = 0;
    let winners = 0;

    let drawnSongs = [];
    while (!winners && songs.length > 0) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const drawnSong = songs.splice(randomIndex, 1)[0];
        drawnSongs.push(drawnSong);
        songsDrawn++;

        for (const board of boards) {
            const isEmpty = board.filter(song => !drawnSongs.includes(song));
            // console.log(drawnSong, isEmpty);
            if (isEmpty.length === 0) {
                winners++;
            }
        }
    }

    return {
        songsDrawn,
        winners
    };
}

function runSimulation(numBoards, numEvaluations) {
    const results = [];

    for (let i = 0; i < numEvaluations; i++) {
        if (i % 100 === 0) console.log(`Completed ${i + 100} of ${numEvaluations} evaluations`);
        const boards = generateBoards(numBoards);
        // boards.forEach(board => console.log(board.join(' ')));
        const result = simulateBingo(boards);
        results.push(result);
    }

    return results;
}

function calculateStatistics(results) {
    const nums = results.map(result => result.songsDrawn);
    nums.sort((a, b) => a - b);
    const sum = nums.reduce((acc, val) => acc + val, 0);
    const average = sum / nums.length;
    const median = nums[Math.floor(nums.length / 2)];
    const p75 = nums[Math.floor(nums.length * 0.75)];
    const lowest = nums[0];

    const winners = results.map(result => result.winners);
    const multipleWinners = winners.filter(num => num > 1);
    const numMultipleWinners = multipleWinners.length;
    const liklihoodOfMultipleWinners = numMultipleWinners / winners.length;
    const howManyWinnersMaxWhenMultiple = Math.max(...multipleWinners);
    const howManyWinnersAverageWhenMultiple = multipleWinners.reduce((acc, val) => acc + val, 0) / multipleWinners.length;
    const threeOrMoreWinners = winners.filter(num => num >= 3);
    const numThreeOrMoreWinners = threeOrMoreWinners.length;
    const liklihoodOfThreeOrMoreWinners = numThreeOrMoreWinners / winners.length;

    return {
        lowest,
        average: average.toFixed(2),
        median,
        p75,
        numMultipleWinners,
        liklihoodOfMultipleWinners,
        howManyWinnersMaxWhenMultiple,
        howManyWinnersAverageWhenMultiple,
        numThreeOrMoreWinners,
        liklihoodOfThreeOrMoreWinners
    };
}

function main() {
    const numBoards = parseInt(process.argv[2]) || 5;
    const numEvaluations = parseInt(process.argv[3]) || 1000;

    console.log(`Running simulation with ${numBoards} boards and ${numEvaluations} evaluations...`);

    const results = runSimulation(numBoards, numEvaluations);
    const stats = calculateStatistics(results);

    console.log('\nResults:');
    console.log(`Lowest songs to win: ${stats.lowest}`);
    console.log(`Average songs to win: ${stats.average}`);
    console.log(`Median songs to win: ${stats.median}`);
    console.log(`75th percentile songs to win: ${stats.p75}`);
    console.log(`Number of multiple winners: ${stats.numMultipleWinners}`);
    console.log(`Likelihood of multiple winners: ${(stats.liklihoodOfMultipleWinners * 100).toFixed(2)}%`);
    console.log(`How many winners max when multiple: ${stats.howManyWinnersMaxWhenMultiple}`);
    console.log(`How many winners average when multiple: ${stats.howManyWinnersAverageWhenMultiple}`);
    console.log(`Number of three or more winners: ${stats.numThreeOrMoreWinners}`);
    console.log(`Likelihood of three or more winners: ${(stats.liklihoodOfThreeOrMoreWinners * 100).toFixed(2)}%`);

    // Write results to a file
    const outputData = `Number of boards: ${numBoards}\nNumber of evaluations: ${numEvaluations}\n\nAverage: ${stats.average}\nMedian: ${stats.median}\n75th Percentile: ${stats.p75}\n`;
    fs.writeFileSync('bingo_stats.txt', outputData);
    console.log('\nResults have been written to bingo_stats.txt');
}

main();
