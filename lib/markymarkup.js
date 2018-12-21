const nunjucks = require('nunjucks')
const prettier = require('prettier')
const _ = require('lodash')



console.log(__dirname)
if (isNode) {
  nunjucks.configure(__dirname + '/templates/') // nunjucks environment
} else if (isBrowser) {
  nunjucks.configure('/lib/markymarkup/templates/') // todo: make this agnostic to script locations?
}




function convert (markup, templateDir) {
  let opts = {}
  if (templateDir) {
    nunjucks.configure(templateDir)
  } 
  

  // split and parse the sections
  let sections = markup.split(/^\*{3}$/mg)
  sections = sections.map(section => parseSection(section))

  // set globals from the first section
  sections.globals = sections[0].data || {}

  // render the sections
  sections = sections.map(section => {
    section.html = renderSection(section, sections.globals)
    return section
  })

  let html = sections.map(section => {
    return section.html
  }).join('\n')

  return prettier.format(html, { parser: 'html' })
}

// convert a section to a data structure
function parseSection (text) {
  let data = {}
  let body, header
  text = text.trim()
  if (regexes.header.test(text)) {
    header = regexes.header.exec(text)[0]
    text = text.replace(header, '')

    for (let line of header.split('\n')) {
      if (regexes.singleLineNumber.test(line)) {
        data.index = regexes.singleLineNumber.exec(line)[1]
      } else if (line.match(regexes.singleLineYAML)) {
        let parts = regexes.singleLineYAML.exec(line)
        data[parts[1]] = parts[2]
      }
    }
  } else {
    body = text
  }
  return {
    text: text,
    content: renderBody(text),
    data: data
  }
}

// render a section structure based on the section content and data, nunjuck env, and global data
function renderSection (section, globals) {
  let content = renderBody(section.content, globals)
  let template = section.data.template || false // if section doesn't have a template, use the standard template
  let html
  if (template) {
    content = nunjucks.render(template + '.njk', { content: content, globals: globals, data: section.data })
  }
  html = nunjucks.render('section.njk', { content: content, globals: globals, data: section.data })

  return prettier.format(html, { parser: 'html' }).trim()
}

// render the markup into html content
function renderBody (markup, globals) {
  let content = markup

  // first replace YAML lines with templated content
  let yamls = allMatches(regexes.singleLineYAML, content)
  for (const line of yamls) {
    let html = nunjucks.render(line[1] + '.njk', { content: line[2] })
    // html += '\n' // add a trailing newline
    content = content.replace(line[0], html)
  }

  // next render newline delimited blocks inside paragraphs
  // add newlines at top and bottom to tmake for easy matching
  content = '\n\n' + content + '\n\n'
  grafs = Array.from(allMatches(regexes.bareGrafs, content))
  for (const graf of grafs) {
    content = content.replace(graf[0], `\n<p>${graf[0].trim()}</p>`)
  }

  return content.trim()
}
// template filter for shortening a string to 10 characters
function clip (string) {
  return string.slice(0, 10)
}

// template filter for creating slugs
function slug (string) {
  return string.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/\-$/, '')
}

// monkey patching the RegExp class to support exporting all matches of a string
function allMatches (regex, string) {
  let matches = []
  let mtch
  let count = 0
  matches.indices = []
  if (regex.global !== true) {
    regex = new RegExp(regex, 'g')
  }

  do {
    mtch = regex.exec(string)
    if (mtch) {
      let index = mtch.index // stow the index of the match\
      matches.input = mtch.input
      matches.indices.push(mtch.index)
      mtch = mtch.map(el => el)
      mtch.index = index
      count++
      matches.push(mtch)
    }
  } while (mtch)

  matches.count = count
  return matches
}

const regexes = {
  singleLineYAML: /^(\w+)\:\s*(.+?)$/mg,
  singleLineNumber: /^\(?([\d\:\. ]+)\)?$/m,
  bareGrafs: /\n\n\s*[^\n<][^\n]+(?=\n\n)/g, // grafs with embedded html don't work
  header: /^([\d\:\.\)\(]+\n)?(\w+\: .+?\n)*\n|(\w+\: .+?$)/ // will also match a leading newline, so pre-trim any text before matching
}

// from the broswer-or-node npm package https://github.com/flexdinesh/browser-or-node/
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null

module.exports = {
  convert,
  regexes,
  renderSection,
  renderBody,
  parseSection,
  allMatches
}
