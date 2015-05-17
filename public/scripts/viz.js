"use strict"

var $, ace, setupViews;

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

  $(".file-name").click(function () {
    var currentText = $(this).data("content");
    console.log("CURRENT: "+currentText); 
    var nextText = $("[data-previous='" + $(this).data("id") + "']").data("content");
    console.log("NEXT: "+nextText);
    editorCurrent.setReadOnly(false);
    editorCurrent.setValue(currentText);
    editorCurrent.setReadOnly(true);

    editorNext.setReadOnly(false);
    editorNext.setValue(nextText);
    editorNext.setReadOnly(true);

  });

  /*
  view.on("click", ".file-name" ,function () {
    var text = $(this).data("content");
    console.log(text);
    editorCurrent.setSession(text);
  });
  */

});