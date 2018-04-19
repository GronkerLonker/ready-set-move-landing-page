const fs = require('fs-extra');
const de = require('./i18n/de.js')
const en = require('./i18n/en.js')

const templateFile = fs.readFileSync(__dirname + '/template.html', 'utf-8');

function replaceValue(template, value, replacementKey) {
	if (typeof value === 'string') {
		return template.split(replacementKey).join(value);
	} else {
		var output = template;
		for (var key in value) {
			output = replaceValue(output, value[key], replacementKey + '.' + key);
		}
		return output;
	}
}

function renderTemplate(i18n) {
	let dirName = __dirname;
	let relativePath = '.'
	if (i18n.language) {
		dirName += '/' + i18n.language
		fs.removeSync(dirName);
		fs.mkdirSync(dirName);
		relativePath = '..'
	}
	var output = templateFile.split('i18n.relativePath').join(relativePath);
	fs.writeFileSync(dirName + '/index.html', replaceValue(output, i18n.entries, 'i18n'));
}

renderTemplate(de);
renderTemplate(en);
