'use strict';

import 'sugar';
import 'angular';

const context = require.context(__dirname, true, /\.spec\./);

context.keys().forEach(context);