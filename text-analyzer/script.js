// TextAnalyzer.js

// List of common pronouns and prepositions
const pronouns = ["i", "me", "my", "mine", "myself", "we", "us", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "who", "whom", "whose", "which", "that"];

const prepositions = ["about", "above", "across", "after", "against", "along", "among", "around", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", "down", "during", "except", "for", "from", "in", "inside", "into", "like", "near", "of", "off", "on", "out", "outside", "over", "past", "since", "through", "to", "toward", "under", "until", "up", "upon", "with", "within", "without"];

// Function to analyze the text
function analyzeText() {
    const inputText = document.getElementById("textInput").value;

    const letterCount = inputText.replace(/[^a-zA-Z]/g, "").length;
    const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;
    const spaceCount = (inputText.match(/ /g) || []).length;
    const newLineCount = (inputText.match(/\n/g) || []).length;
    const specialSymbolCount = inputText.replace(/[a-zA-Z0-9\s]/g, "").length;

    const tokens = inputText.split(/[^a-zA-Z']+/);

    const pronounCounts = countOccurrences(tokens, pronouns);
    const prepositionCounts = countOccurrences(tokens, prepositions);

    displayResults(letterCount, wordCount, spaceCount, newLineCount, specialSymbolCount, pronounCounts, prepositionCounts);
}

// Helper function to count occurrences of a given list
function countOccurrences(tokens, list) {
    const counts = {};
    const normalizedList = new Set(list.map(word => word.toLowerCase()));

    tokens.forEach(token => {
        const normalized = token.toLowerCase();
        if (normalizedList.has(normalized)) {
            counts[normalized] = (counts[normalized] || 0) + 1;
        }
    });
    return counts;
}

// Function to display results on the webpage
function displayResults(letters, words, spaces, newlines, specials, pronouns, prepositions) {
    const output = document.getElementById("output");
    output.innerHTML = `
        <p>Letters: ${letters}</p>
        <p>Words: ${words}</p>
        <p>Spaces: ${spaces}</p>
        <p>Newlines: ${newlines}</p>
        <p>Special Symbols: ${specials}</p>
        <h3>Pronouns:</h3> <pre>${JSON.stringify(pronouns, null, 2)}</pre>
        <h3>Prepositions:</h3> <pre>${JSON.stringify(prepositions, null, 2)}</pre>
    `;
}

// Event listener to trigger analysis
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analyzeButton").addEventListener("click", analyzeText);
});
