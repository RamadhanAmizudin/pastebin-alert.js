pastebin-alert.js
=====================

Pastebin Alert
================
This tool basically fetch latest public paste on pastebin, and show on console log if any keyword match.

Requirement
============
* MySQL Server
* NodeJS (obviously)
* NPM


Installing
==========
    $ npm install
    $ cp config-sample.json config.json
    $ vim config.json // for configuring db connection

Run
====
    node app.js

Notes
======
    1. Delay in configuration file is in milisecond
    2. Keyword doesn't accept regexp.
    3. Pastebin developer key can be found here: http://pastebin.com/api#1
    4. Setting delay lower than 1 minute might get you banned on pastebin :)

Events
=======
### 'error'
* Error if any

### 'archive.pasteid'
* list of pastebin id fetched at pastebin.com/archive

### 'new'
* return data of pastebin id.

Example:
```javascript
{
  pastebin_id: 'xxxx',
  title: 'Untitled',
  created: '2015-08-01T04:19:12+08:00',
  author: 'guest',
  ispro_account: false,
  size: '53.10 KB',
  expires: 'Never',
  syntax: 'None',
  content: 'pastebin content'
}
```

Status
======
This project was purely for my personal learning. If it isn't obvious, this shouldn't be incorporated in any type of application, and the only reason it is open source is that if someone would find useful information or parts from it.

License
=======
The MIT License (MIT)

Copyright (c) 2015 Ahmad Ramadhan Amizudin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Questions & Comments
=====================
If you encounter a bug, please feel free to post it on GitHub. For questions or comments.
