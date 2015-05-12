"use strict"

var $, ace;

ace = require("brace");
$ = require("jquery");

require("brace/ext/searchbox");
require("./ace/mode-grace");

$(function () {
  var back, editorCurrent, editorNext, filestates, forward, view;

  view = $("#grace-view");

  editorCurrent = ace.edit(view.find(".editor-current")[0]);
  editorNext =  ace.edit(view.find(".editor-next")[0]);

  editorCurrent.setReadOnly(true);
  editorNext.setReadOnly(true);


  filestates = view.find(".filestate");

  back = view.find(".back");
  forward = view.find(".forward");

  back.click(function () {
    console.log("Back");
  });

  forward.click(function () {
    console.log("Forward");
  });



});