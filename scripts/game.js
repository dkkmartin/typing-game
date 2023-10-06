import getQoute from './qouteAPI'
import Timer from './timer'
import { animate } from 'motion'

// eslint-disable-next-line prefer-const
let iteratorWord = 0
let iteratorChar = 0
let wordsTyped = 0
let errorsByUser = 0
let currentWord
let textArray
let typedCharacterArray = []
let allTypedCharacters = []
let timerInterval
let timer

// Fetch text, clean text
async function getTextFromApi () {
  // Get the quote from API
  const textData = 'Ben 10 ben 10 ben 10'
  // const textData = await getQoute('50')
  // Clean the text for unwanted special characters
  const cleanedText = textCleaner(textData)
  // Make array out of cleaned text
  textArray = cleanedText.split(' ')
  // Makes a space between every word
  for (let i = 1; i < textArray.length; i += 2) {
    textArray.splice(i, 0, ' ')
  }
  currentWord = textArray[iteratorWord]
  console.log(textArray)
}

// Display the text on the screen
function displayText () {
  const textDiv = document.querySelector('#text')
  // Loop over every word in array and make new p elements then append to div
  textArray.forEach((word, index) => {
    const newPElement = document.createElement('p')
    // If the index is not even then it must be whitespace
    if (index % 2 === 0) {
      newPElement.classList.add('word')
    } else {
      // Add class space for whitespace
      newPElement.classList.add('space')
    }
    newPElement.textContent = word
    textDiv.appendChild(newPElement)
  })
}

function keyPressHandler (e) {
  // Get the first character in the current word
  const firstCharInWord = currentWord[iteratorChar]
  if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9 ]/)) {
    // Push the typed character to an array to check later if it matches
    typedCharacterArray.push(e.key)
    allTypedCharacters.push(e.key)
    // If typed character is not equal to first character in word
    // We dont actually need this if we are to support wrong typed words
    if (e.key !== firstCharInWord) {
      // Trigger wrong feedback to user
      console.log('wrong')
      errorsByUser++
      console.log('Erros made: ' + errorsByUser)
      // Else it must be right character
    } else {
      // Trigger correct feedback to user
      iteratorChar++
      console.log('Correct')
    }
  } else if (e.key === 'Backspace') {
    typedCharacterArray.pop()
  }

  // If this is true we have typed the length of the current word
  if (typedCharacterArray.length === currentWord.length) {
    // Join the characters we have typed to match it with the current word
    const arrayToString = typedCharacterArray.join('')
    // If it matches we have typed the word correct and can go to next word
    if (arrayToString === currentWord) {
      // iterator increases so we get the next word
      iteratorWord++
      // Reset iterator for char so it starts from the start
      iteratorChar = 0
      // current word is now picked from text array with the iterator we just increased
      currentWord = textArray[iteratorWord]
      const typedWord = allTypedCharacters.join('')
      allTypedCharacters = []
      allTypedCharacters.push(typedWord)
      // Reset typed character array
      typedCharacterArray = []
      // Words typed is increased as we typed the word
      wordsTyped++
    }
  }
  if (wordsTyped === textArray.length) {
    // If words typed are equal to the length of text array we have finished the race
    console.log('No more words')
    // Run win function
    winHandler()
  }
  console.log(typedCharacterArray)
}

function statisticCalculator () {
  // Calculate netWPM
  function calculateNetWPM (grossWPM, errors, timeInSeconds) {
    // Convert time in seconds to time in minutes
    const timeInMinutes = timeInSeconds / 60

    // Calculate error rate per minute
    const errorRate = errors / timeInMinutes

    // Calculate net WPM by subtracting the error rate from gross WPM
    const netWPM = grossWPM - errorRate

    return netWPM
  }

  // Calculate accuracy with lavenshtein distance algorithm
  function calculateStringSimilarity (string1, string2) {
    function levenshteinDistance (str1, str2) {
      const m = str1.length
      const n = str2.length

      const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          if (i === 0) {
            dp[i][j] = j
          } else if (j === 0) {
            dp[i][j] = i
          } else if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1]
          } else {
            dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
          }
        }
      }

      return dp[m][n]
    }

    const distance = levenshteinDistance(string1, string2)
    const maxLength = Math.max(string1.length, string2.length)
    const similarityPercentage = ((maxLength - distance) / maxLength) * 100

    return similarityPercentage
  }

  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const grossWPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  const netWPM = calculateNetWPM(grossWPM, errorsByUser, timeInSeconds).toFixed(0)
  const accuracy = calculateStringSimilarity(textArray.join(''), allTypedCharacters.join('')).toFixed(0)

  return { netWPM, accuracy }
}

function winHandler () {
  removeKeyboardListener()
  timer.stop()
  clearInterval(timerInterval)
  const statistics = statisticCalculator()
  console.log('WPM: ' + statistics.netWPM)
  console.log('Accuracy: ' + statistics.accuracy)
}

function keyboardHandler () {
  document.addEventListener('keydown', keyPressHandler)
}

function removeKeyboardListener () {
  document.removeEventListener('keydown', keyPressHandler)
}

function textCleaner (text) {
  const corrections = {
    '!': '',
    '?': '',
    '"': '',
    ':': '',
    ';': '',
    '.': '',
    ',': '',
    '\'': '',
    '-': ''
  }
  Object.keys(corrections).forEach(key => {
    text = text.replaceAll(key, corrections[key])
  })
  return text
}

function animationWrong () {
  animate(
    '#time',
    { x: [0, -25, 0, 25, 0, -25, 0, 25, 0], color: ['red', '#808080'] },
    { duration: 0.5 }
  )
}

function startTimer () {
  timer = new Timer()
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000)
    document.getElementById('time').innerText = timeInSeconds
  }, 100)
}

export default function runGame () {
  getTextFromApi().then(() => {
    displayText()
    keyboardHandler()
    startTimer()
  })
}

runGame()