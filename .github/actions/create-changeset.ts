// import json from './temp-api-response.json'
import { readFileSync } from 'fs';

const json = readFileSync('./temp-api-response.json')

console.log(JSON.parse(json))

// import Mustache from 'mustache';

// function renderReleaseNotes() {
//   fetch('template.mustache')
//     .then((response) => response.text())
//     .then((template) => Mustache.render(template, { name: 'Luke' }););
// }

// var output = Mustache.render("{{title}} spends {{calc}}", view);