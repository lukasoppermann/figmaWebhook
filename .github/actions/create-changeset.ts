// import json from './temp-api-response.json'
// import Mustache from 'mustache';
import { render } from '../templates/default-release-note'
import { readFileSync, writeFileSync } from 'fs';

// const renderWithTemplate = (template: string, data: Record<string, unknown>): Promise<string> => {
//   const templateContent = readFileSync(template).toString()
//   return Mustache.render(templateContent, data)
// }

const json = readFileSync('./temp-api-response.json')
const parsedJson = JSON.parse(json.toString())

const changeset = render(parsedJson).replace(/\n{2,}/g, "\n")
writeFileSync(`.changeset/${parsedJson.fileInfo.fileName}-${parsedJson.fileInfo.timestamp}.md`, changeset)
