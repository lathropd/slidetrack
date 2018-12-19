const nunjucks = require('nunjucks')
const jsdom = require('jsdom')
const prettier = require('prettier')
const isHtml = require('is-html');
const _ = require('lowdash');

//console.log(__dirname)


function convert(markup, templateDir) {
    let env // nunjucks environment
    
    if (templateDir) {
        env = nunjucks.configure(templateDir)

    } else if (isNode) {
        env = nunjucks.configure(__dirname + "/templates")
    } else {
        // what do we do without a config and not in node?
        // TODO: should probably grab pre-compiled templates
    }


    // split and parse the sections
    let sections = markup.split("\n***\n")
    sections = sections.map(section => sectionParse(section))
    
    // set globals from the first section
    sections.globals = sections[0].data || {}

    // render the sections
    sections.map(section => sectionRender(section, env, section.globals))
    
    
    let html = sections.map(section => {
        return section.html
    }).join("\n")


    return prettier.format(html, {
        parser: 'html'
    });

}


// convert a section to a data structure
function sectionParse(text) {
    let regexes = {
        singleLineYAML: /^(\w+)\:\s*(.+?)$/m,
        singleLineNumber: /^\(?([\d\:\. ]+)\)?$/m,
        header: /^([\d\:\.\)\(]+\n)?(\w+\: .+?\n)*\n/s, // will also match a leading newline, so pre-trim any text before matching
    }
    let data = {}
    let content, header
    text = text.trim()
    if (regexes.header.test(text)) {
        header = regexes.header.exec(text)[0]
        content = text.replace(header, '')

        for (let line of header.split('\n')) {
            if (regexes.singleLineNumber.test(line)) {
                data.index = regexes.singleLineNumber.exec(line)[1]
            } else if (regexes.singleLineYAML.test(line)){
                let parts = regexes.singleLineYAML.exec(line)
                data[parts[1]] = parts[2]
            }
        } 

    } else {
        body = text
    }
    return {
        text: text,
        content: body,
        data: data
    }
}


// render a section structure based on the section content and data, nunjuck env, and global data
function sectionRender(section, env, globals) {
    let content = renderBody(section.content)
    let template = section.data.template || 'section' // if section doesn't have a template, use the standard template
    
    
    

}


// template filter for shortening a string to 10 characters
function clip(string) {
    return string.slice(0, 10)

}

// template filter for creating slugs
function slug(string) {
    return string.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/\-$/, '')
}



// monkey patching the RegExp class to support exporting all matches of a string
RegExp.prototype.allMatches = function (string) {
    let matches = []
    let mtch
    let count = 0
    matches.indices = []
    while (mtch = this.exec(string)) {
        let index = mtch.index // stow the index of the match\
        matches.input = mtch.input
        matches.indices.push(mtch.index)
        mtch = mtch.map(el => el)
        mtch.index = index
        count++
        matches.push(mtch)
    }
    matches.count = count
    return matches
}




// from the broswer-or-node npm package https://github.com/flexdinesh/browser-or-node/
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null



module.exports = {
    convert,

}
