"use strict"

var $, ace,setupViews;

ace = require("brace");
$ = require("jquery");

require("brace/ext/searchbox");
require("./ace/mode-grace");

$(function () {
  var back, diffView, filestates, forward, view;

  view = $("#grace-view");

  /*
    editorCurrent = ace.edit(view.find(".editor-current")[0]);
    editorNext =  ace.edit(view.find(".editor-next")[0]);
  */

  //editorCurrent = CodeMirror.fromTextArea(view.find(".editor-diff")[0]);

  /*
    editorCurrent = CodeMirror(view.find("#editor-diff")[0],{
      theme: "eclipse",
      lineNumbers: true,
      mode: "htmlmixed"
    });
  */

  diffView = CodeMirror.MergeView(document.getElementById("editor-diff"), {
                value: "No State Selected",
                orig: "No State Selected",
                lineNumbers: true,
                mode: "javascript",
                highlightDifferences: true
            });

  diffView.readOnly = true;

  view.find(".CodeMirror-merge-2pane")[0].className = view.find(".CodeMirror-merge-2pane")[0].className + " horizontal";

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
    var editor = document.getElementById("editor-diff");
    var currentText = $(this).data("content");
    var nextText = $("[data-previous='" + $(this).data("id") + "']").data("content");
    var highlight = true;

    if(nextText === undefined){
      nextText = "No Next State";
      highlight = false;
    }

    editor.innerHTML = "";
    diffView = CodeMirror.MergeView(editor, {
        origLeft: currentText,
        value: nextText,
        lineNumbers: true,
        mode: "javascript",
        highlightDifferences: highlight
    });

    view.find(".CodeMirror-merge-2pane")[0].className = view.find(".CodeMirror-merge-2pane")[0].className + " horizontal";
    diffView.readOnly = true;
    $(".file-name").removeClass( "selected" );
    $(this).addClass("selected");
  });

  /*
  view.on("click", ".file-name" ,function () {
    var text = $(this).data("content");
    console.log(text);
    editorCurrent.setSession(text);
  });
  */

});