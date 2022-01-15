
// ------------------ Check for options -------------------- //
const OPTIONS_KEY = 'guessle-options'
let blankOptions = JSON.stringify({ dark: false, depth: 2, duplicateLetters: true, wordLength: 5 })
let options = localStorage.getItem(OPTIONS_KEY)
if (options) {
    try {
        options = { ...JSON.parse(blankOptions), ...JSON.parse(options) }
        localStorage.setItem(OPTIONS_KEY, JSON.stringify(options))
    } catch(err) {
        console.warn('Bad options:', err.message)
        options = JSON.parse(blankOptions)
        localStorage.setItem(OPTIONS_KEY, JSON.stringify(options))
    }
} else {
    options = JSON.parse(blankOptions)
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(options))
}
if (options.dark) {
    document.getElementsByClassName("ds-page")[0].classList.add('ds-dark')
}

// ------------------ Convert the startTime to date display -------------------- //
const startTimeEl = document.querySelector('.start-time')
const startDate = new Date(Number(startTimeEl.innerText))
startTimeEl.setAttribute('data-starttime', startTimeEl.innerText)
startTimeEl.innerText = startDate.toLocaleDateString()


// ------------------ Add players stats from localstorage -------------------- //

const STATS_KEY = 'guessle-stats'
let blankStats = JSON.stringify({ played: 0, won: 0, quit: 0, guessAvg: 0 })
let stats = localStorage.getItem(STATS_KEY)
if (stats) {
    try {
        stats = JSON.parse(stats)
        if (stats.played !== (stats.won + stats.quit)) {
            throw new Error('Stats look out of balance, so unfortunately they are getting reset: ' + JSON.stringify(stats))
        }
    } catch(err) {
        console.warn('Bad stats:', err.message)
        stats = JSON.parse(blankStats)
        localStorage.setItem(STATS_KEY, JSON.stringify(stats))
    }
} else {
    stats = JSON.parse(blankStats)
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}


