'use strict'
var rtfparser = require('rtf-parser');
var RTFParagraph = require('rtf-parser/rtf-paragraph.js');

function unrtf(obj, cb) {
	var nl = false;

	if (typeof obj == 'object') {
		if (obj instanceof RTFParagraph) {
			nl = true;
		}

		if (Array.isArray(obj.content)) {
			var out = '';
			for (var i = 0; i < obj.content.length; ++i) {
				out += unrtf(obj.content[i]);;
			}

			if (nl) {
				out += "\n";
			}
			return out;
		}

		if (obj.content !== undefined) {
			return unrtf(obj.content);
		}

		if (obj.value !== undefined) {
			// Text
			return obj.value;
		}

		if (Array.isArray(obj)) {
			var out = '';

			for (var i = 0; i < obj.length; ++i) {
				out += unrtf(obj[i]);
			}
			
			return out;
		}
	}

	throw new Error("Unknown/unhandled RTF part:" + JSON.stringify(obj));
	return '';
}

var rtf2txt = {};
rtf2txt.string = function (string, cb) {
	rtfparser.string(string, function (err, doc) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, unrtf(doc));
	});
};

rtf2txt.stream = function (stream, cb) {
	rtfparser.stream(stream, function (err, doc) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, unrtf(doc));
	});
};

module.exports = rtf2txt;
