const fs = require('fs')

console.log('Starting notes app');

var fetchNote = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var fetchNotes = (title, body) => {
    var notes = fetchNote();
    return notes;
}

var addNote = (title, body) => {
    var notes = fetchNotes(title, body);
    var note = {
        title,
        body
    };
    //One way of writing this
    /*  var duplicateString = notes.filter(function (notes) {
         return notes.title === title;
     }); */

    //Another way of writing in ECMA6
    var duplicateString = notes.filter((notes) => notes.title === title);

    if (duplicateString.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {
    console.log("Getting all the notes");
    var notes = fetchNote();
    return notes;
}

var readNote = (title) => {
    console.log("Reading the notes of the title:", title);
    var notes = fetchNote();
    var filteredNotes = notes.filter((notes) => notes.title === title);
    return filteredNotes[0];
}

var removeNote = (title) => {
    console.log("Fetching details of the title:", title);
    var notes = fetchNote();
    var filteredNotes = notes.filter((notes) => notes.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
    debugger;
    console.log(`Title:${note.title}`);
    console.log(`Body:${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
};