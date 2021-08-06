import React, { useEffect } from "react";

export default function StaticWheel(props) {
  var segments = props.segments,
    segColors = props.segColors,
    primaryColor = props.primaryColor,
    contrastColor = props.contrastColor,
    buttonText = props.buttonText,
    _ref$isOnlyOnce = props.isOnlyOnce,
    isOnlyOnce = _ref$isOnlyOnce === void 0 ? true : _ref$isOnlyOnce,
    _ref$size = props.size,
    size = _ref$size === void 0 ? 290 : _ref$size;
  var currentSegment = "";
  var isStarted = false;
  var angleCurrent = 0;
  var canvasContext = null;
  var centerX = size + 10;
  var centerY = size + 10;
  var sumOfSegmentsRef = 0;
  var listOfSegmentVRef = [];
  var angleArray = [];
  useEffect(function () {
    for (var i = 0; i < segments.length; i++) {
      sumOfSegmentsRef += segments[i].itemv;
      listOfSegmentVRef.push(segments[i].itemv);
    }
    wheelInit();
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  var wheelInit = function wheelInit() {
    initCanvas();
    wheelDraw();
  };

  var initCanvas = function initCanvas() {
    var canvas = document.getElementById("canvas");

    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", 1000);
      canvas.setAttribute("height", 600);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvasContext = canvas.getContext("2d");
  };

  var wheelDraw = function wheelDraw() {
    clear();
    drawWheel();
    drawNeedle();
  };

  var drawSegment = function drawSegment(key, lastAngle, angle) {
    var ctx = canvasContext;
    var value = segments[key].itemu;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em proxima-nova";
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  var drawWheel = function drawWheel() {
    var ctx = canvasContext;
    var lastAngle = angleCurrent;
    var len = segments.length;
    var PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em proxima-nova";
    let sumOfSegments = 0;
    let listOfSegmentV = [];
    for (var i = 0; i < len; i++) {
      sumOfSegments += segments[i].itemv;
      listOfSegmentV.push(segments[i].itemv);
    }

    angleArray = [];
    let angleSum = 0;
    for (var i = 1; i <= len; i++) {
      //var angle = PI2 * (i / len) + angleCurrent;
      var angle =
        PI2 * ((listOfSegmentV[i - 1] + angleSum) / sumOfSegments) +
        angleCurrent;
      angleSum += listOfSegmentV[i - 1];
      angleArray.push(angle);
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 1, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 1em proxima-nova";
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "", centerX, centerY + 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  var drawNeedle = function drawNeedle() {
    var ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 5, centerY - 1);
    ctx.lineTo(centerX - 5, centerY - 1);
    ctx.lineTo(centerX, centerY - 30);
    ctx.closePath();
    ctx.fill();
    var change = angleCurrent + Math.PI / 2;
    //var i = segments.length - Math.floor(change / (Math.PI * 2) * segments.length) - 1;
    var i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * sumOfSegmentsRef) -
      1;

    var værdi = (change / (Math.PI * 2)) * sumOfSegmentsRef;

    var result = sumOfSegmentsRef - værdi;
    var ref = 0;
    var found = false;
    var count = 0;
    while (ref < sumOfSegmentsRef && !found) {
      let currentHigh = segments[count].itemv + ref;
      if (ref <= result && currentHigh >= result) {
        found = true;
      } else {
        ref += segments[count].itemv;
        count++;
      }
    }
    if (count > segments.length - 1) count = segments.length - 1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor || "black";
    ctx.font = "bold 1.5em proxima-nova";
    currentSegment = segments[count].item;
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  var clear = function clear() {
    var ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return React.createElement(
    "div",
    {
      id: "wheel",
    },
    React.createElement("canvas", {
      id: "canvas",
      width: centerX * 2,
      height: centerY * 2,
      style: {
        pointerEvents: isOnlyOnce ? "none" : "auto",
      },
    })
  );
}
