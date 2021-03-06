"use strict"

var $, ace, compiler, fdbk, path, setupViews;

ace = require("brace");
$ = require("jquery");
path = require("path");

require("brace/ext/searchbox");
require("./ace/mode-grace");

compiler = require("./compiler");
fdbk = require("./feedback");

HttpClient = function () {
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () { 
      if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200){
        aCallback(anHttpRequest.responseText);
      }
    }
    anHttpRequest.open( "GET", aUrl, true );            
    anHttpRequest.send( null );
  }
  this.post = function (aUrl, params, aCallback) {
    var http = new XMLHttpRequest();
    http.open("POST", aUrl, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
      }
    }
    http.send(params);
  }
}

$(function () {
  var back, diffView, feedbacks, fileElement, fileName,
      filestates, forward, i, texts, view;

  view = $("#grace-view");

  fileName = $("#file-name")

  fileElement = null;

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
                mode: "clike",
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

  /*
  $(document).click(function(event) {
    var aClient = new HttpClient();
    var text = $(event.target).attr('class');
    if(text != undefined){
      aClient.post("/service/click", "clickEvent="+text, function (response) {
      });
    }
  });
  */

  function getLeftText() {
    return $(fileElement).data("content");
  }

  function getRightText(ctxt) {
    return $("[data-previous='" + $(fileElement).data("id") + "']").data("content");
  }

  $(".file-name").click(function () {
    var i;

    fileElement = this;

    var editor = document.getElementById("editor-diff");
    var currentText = getLeftText();
    var nextText = getRightText();
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
        mode: "text/x-grace",
        highlightDifferences: highlight
    });

    view.find(".CodeMirror-merge-2pane")[0].className = view.find(".CodeMirror-merge-2pane")[0].className + " horizontal";
    diffView.readOnly = true;
    $(".file-name").removeClass( "selected" );
    $(this).addClass("selected");

    for (i = 0; i < 2; i += 1) {
      feedbacks[i].compilation.waiting();
      feedbacks[i].output.clear();
    }
  });

  /*
  view.on("click", ".file-name" ,function () {
    var text = $(this).data("content");
    console.log(text);
    editorCurrent.setSession(text);
  });
  */

  feedbacks = [];
  texts = [getLeftText, getRightText];

  for (i = 0; i < 2; i += 1) {
    (function (i) {
      var feedback;

      function stop() {
        feedback.compilation.stop();
      }

      feedback = fdbk.setup($("#feedback" + i), function () {
        var modname, name;

        if (fileElement === null || texts[i]() === undefined) {
          feedback.compilation.waiting();
          alert("Cannot build when no state selected.");
          return;
        }

        name = fileName.text();
        modname = path.basename(name, ".grace");

        compiler.compile(modname, texts[i](), function (reason) {
          if (reason !== null) {
            feedback.error(reason);

            // if (reason.module === name && reason.line) {
            //   session.setAnnotations([ {
            //     "row": reason.line - 1,
            //     "column": reason.column && reason.column - 1,
            //     "type": "error",
            //     "text": reason.message
            //   } ]);
            // }
          } else {
            feedback.compilation.ready();
          }
        });
      }, function () {
        var escaped, modname;

        feedback.running();

        modname = path.basename(fileName.text(), ".grace");
        escaped = "gracecode_" + modname.replace("/", "$");

        global.gracecode_main = global[escaped];
        global.theModule = global[escaped];

        minigrace.lastSourceCode = texts[i]();
        minigrace.lastModname = modname;
        minigrace.lastMode = "js";
        minigrace.lastDebugMode = true;

        minigrace.stdout_write = function (value) {
          feedback.output.write(value);
        };

        minigrace.stderr_write = function (value) {
          feedback.output.error(value);
          stop();
        };

        try {
          minigrace.run();
        } catch (error) {
          feedback.output.error(error.toString());
        } finally {
          stop();
        }
      });

      feedbacks.push(feedback);
    }(i));
  }

});