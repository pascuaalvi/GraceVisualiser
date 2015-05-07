"use strict"

var ace;

ace = require("brace");

require("brace/ext/searchbox");
require("./ace/mode-grace");

exports.setup = function (files, view, fdbk) {
  var back, editorCurrent, editorNext, filestates, forward;
  // Find editors
  editorCurrent = ace.edit(view.find(".editor")[0]);
  editorNext =  ace.edit(view.find(".editor")[1]); 

  filestates = view.find(".filestate");

  back = view.find(".back");
  forward = view.find(".forward");

  back.click(function () {
    console.log(filestates);
  });

  forward.click(function () {
    console.log(filestates);
  });

  return filestates;
}