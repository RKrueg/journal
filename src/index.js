import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function Journal() {
  this.journalEntry = {};
  this.entryId = 0;
}

Journal.prototype.assignId = function () {
  this.entryId += 1;
  return this.entryId;
};

Journal.prototype.addEntry = function (entry) {
  entry.id = this.assignId();
  this.journalEntry[entry.id] = entry;
};

Journal.prototype.findEntry = function (id) {
  if (this.journalEntry[id]) {
    return this.journalEntry[id];
  }
  return false;
};

function Entry(title, entry) {
  this.title = title;
  this.entry = entry;
}

//UI Logic
let journal = new Journal();

function handleSubmit(event) {
  event.preventDefault();
  const inputTitle = document.querySelector("input#title").value;
  const inputEntry = document.querySelector("textarea#entry").value;
  let newEntry = new Entry(inputTitle, inputEntry);
  journal.addEntry(newEntry);
  document.querySelector("input#title").value = null;
  document.querySelector("textarea#entry").value = null;

  console.log(journal);
}

function handleClick(event) {
  event.preventDefault();
  const inputId = document.querySelector('input#id').value;
  document.querySelector("h2#title-output").innerText = journal.journalEntry[inputId].title;
  document.querySelector("p#entry-output").innerText = journal.journalEntry[inputId].entry;
}

function handleGetVandC(event) {
  event.preventDefault();
  const inputId = document.querySelector('input#id').value;
  // gets vowels -----------------------------------------------------------  
  const vMatch = journal.journalEntry[inputId].entry.match(/[aeiou]/gi);
  // gets vowels ----------------------------------------------------------- 

  // gets consonants ----------------------------------------------------------- 
  const cMatch = journal.journalEntry[inputId].entry.match(/[^aeiou\s\W]/gi);
  // gets consonants -----------------------------------------------------------
  document.getElementById('vowel-output').innerHTML = 'Vowels: ' + vMatch.length;
  document.getElementById('consonant-output').innerHTML = 'Consonants: ' + cMatch.length;
}

function handleTeaser(event) {
  event.preventDefault();
  const inputId = document.querySelector('input#id').value;
  const words = journal.journalEntry[inputId].entry.split(' ');
  let counter = 1;
  let teaser = '';
  words.forEach(function(element) {
    if (element[element.length - 1] === '.' && counter <= 8) {
      teaser += element;
      counter = 9;
    } else if (counter <= 8) {
      teaser += element + ' ';
      counter++;
    } 
  });

  document.getElementById('teaser-output').innerHTML = teaser;
}

window.addEventListener("load", function () {
  document.querySelector("form#journal-entries").addEventListener("submit", handleSubmit);
  document.querySelector('button#id').addEventListener('click', handleClick);
  document.getElementById('vowels-consonants').addEventListener('click', handleGetVandC);
  document.getElementById('teaser').addEventListener('click', handleTeaser);
});

