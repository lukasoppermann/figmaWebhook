// import json from './temp-api-response.json'
import Mustache from 'mustache';
import { readFileSync, writeFileSync } from 'fs';

const renderWithTemplate = async (template: string, data: Record<string, unknown>): Promise<string> => {
  return fetch(template)
    .then((response) => response.text())
    .then((template) => Mustache.render(template, data))
}

const json = readFileSync('./temp-api-response.json')
const parsedJson = JSON.parse(json.toString())

const writeChangeset = async () => {
  const changeset = await renderWithTemplate('../templates/default-release-note.mustache', parsedJson)
  writeFileSync(`.changeset/${parsedJson.fileInfo.fileName}-${parsedJson.fileInfo.timestamp}.md`, changeset)
}

writeChangeset()