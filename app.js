console.log("Starting the app.")
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const titleConst = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const bodyConst = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

var command = process.argv[2];
const argv = yargs.command('add', 'Add a new note', {
    title: titleConst,
    body: bodyConst
}).
command('list', 'List all the notes').
command('remove', 'Remove a particular note', {
    title: titleConst,
    body: bodyConst
}).
command('read', 'Read an existing note', {
    title: titleConst,
    body: bodyConst
}).
help().
argv;
console.log('Yargs:\n', argv);

if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing all the ${allNotes.length} note(s)`);
    //One way of looping through for loop
    /* if (note.length != 0) {
        for (var i = 0; i < note.length; i++) {
            console.log(`Title:${note[i].title}`);
            console.log(`Body:${note[i].body}`);
        }
    } */

    //Another way of for loop without initializing a array variable i
    allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'add') {
    console.log("Add a new note");
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
    } else {
        console.log("Title already taken.Use another one");
    }
} else if (command === 'read') {
    console.log("Read the particular note");
    var note = notes.readNote(argv.title);
    if (note.length != 0) {
        notes.logNote(note);
    } else {
        console.log("Title doesn't exist");
    }
} else if (command === 'remove') {
    var note = notes.removeNote(argv.title);
    if (note) {
        console.log("Title is removed");
    } else {
        console.log("Title not available");
    }
} else {
    console.log("Command not recognized");
}