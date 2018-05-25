# rtf2text

This is a simplified RTF to text tool that just discards all RTF formatting from the document, and returns the document in plaintext.

```js
const rtf2text = require('rtf2text')
const fs = require('fs')

parseRTF.string('{\\rtf1\\ansi\\b hi there\\b0}', (err, text) => {
  …
})

parseRTF.stream(fs.createReadStream('example.rtf'), (err, text) => {
  …
})
```

## More info about the RTF parsing

Look at the [rtf-parser](https://www.npmjs.com/package/rtf-parser) module that this module is dependant upon. Thats where all the magic happens.

