var Decoder = require('../lib/utils').Decoder;
var assert = require('assert');

[
  { source: ['Hello world'],
    expected: 'Hello world',
    what: 'No encoded bytes'
  },
  { source: ['Hello%20world'],
    expected: 'Hello world',
    what: 'One full encoded byte'
  },
  { source: ['Hello%20world%21'],
    expected: 'Hello world!',
    what: 'Two full encoded bytes'
  },
  { source: ['Hello%', '20world'],
    expected: 'Hello world',
    what: 'One full encoded byte split #1'
  },
  { source: ['Hello%2', '0world'],
    expected: 'Hello world',
    what: 'One full encoded byte split #2'
  },
  { source: ['Hello%20', 'world'],
    expected: 'Hello world',
    what: 'One full encoded byte (concat)'
  },
  { source: ['Hello%2Qworld'],
    expected: 'Hello%2Qworld',
    what: 'Malformed encoded byte #1'
  },
  { source: ['Hello%world'],
    expected: 'Hello%world',
    what: 'Malformed encoded byte #2'
  },
  { source: ['Hello+world'],
    expected: 'Hello world',
    what: 'Plus to space'
  },
  { source: ['Hello+world%21'],
    expected: 'Hello world!',
    what: 'Plus and encoded byte'
  },
].forEach(function(v) {
  var dec = new Decoder(), result = '';
  v.source.forEach(function(s) {
    result += dec.write(s);
  });
  var msg = '[' + v.what + ']: decoded string mismatch';
  assert.deepEqual(result, v.expected, msg);
});
