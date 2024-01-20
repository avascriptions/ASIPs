const fs = require('fs');
const path  = require('path');

const pullRequestSHA = process.argv[2];
// const changedFiles = typeof process.argv[3] != 'undefined' ? process.argv[3].split(',') : [];
const fields = ['asip', 'title', 'description', 'author', 'discussions-to', 'status', 'category', 'created', 'requires'];
const statuses = [ 'Idea', 'Draft', 'Review', 'Final', 'Stagnant', 'Withdrawn' ]
console.log(`Pull Request SHA: ${pullRequestSHA}`);
// console.log(`Changed Files: ${changedFiles}`);

const proposals = fs.readdirSync('ASIPs/');
for (const proposal of proposals) {
    validateASIP(proposal);
}

function validateASIP(fileName) {
    // check file name
    const baseName = path.basename(fileName);
    if (!/^ASIP-\d+.md$/.test(baseName)) {
        throw new Error('file name error');
    }
    
    // check file content
    const fileContent = fs.readFileSync('ASIPs/' + fileName, 'utf8');
    if (!fileContent.startsWith('---')) {
        throw new Error('ASIP markdown file must start with a table');
    }
    const [ table, content ] = fileContent.substring(3).split('---');
    const items = table.replace(/\r\n/g, '\n').split('\n').filter(x => x.length > 0).map(x => {
        const idx = x.indexOf(':');
        if (idx <= 0) {
            throw new Error('table format error');
        }
        const key = x.substring(0, idx);
        const value = x.substring(idx + 1).trim();
        return { key, value }
    });
    for (const item of items) {
        if (!fields.includes(item.key)) {
            throw new Error('wrong table key');
        }
        if (item.key != 'requires' && item.value.trim() == '') {
            throw new Error(`${item.key} can not be empty`);
        }
        if (item.key == 'status' && !statuses.includes(item.value)) {
            throw new Error(`status value invalid`);
        }
    }
    if (!content.includes('## Specification')) {
        throw new Error(`proposal missing the specification`);
    }
    if (!content.includes('## Rationale')) {
        throw new Error(`proposal missing the rationale`);
    }
    console.log(fileName + ' was validated');
}

