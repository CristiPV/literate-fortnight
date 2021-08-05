import React, { useEffect, useState } from "react";

export default function SpinningWheel(props) {
  var segments = props.segments,
    segColors = props.segColors,
    winningSegment = props.winningSegment,
    onFinished = props.onFinished,
    primaryColor = props.primaryColor,
    contrastColor = props.contrastColor,
    buttonText = props.buttonText,
    _ref$isOnlyOnce = props.isOnlyOnce,
    isOnlyOnce = _ref$isOnlyOnce === void 0 ? true : _ref$isOnlyOnce,
    _ref$size = props.size,
    size = _ref$size === void 0 ? 290 : _ref$size,
    _ref$upDuration = props.upDuration,
    upDuration = _ref$upDuration === void 0 ? 100 : _ref$upDuration,
    _ref$downDuration = props.downDuration,
    downDuration = _ref$downDuration === void 0 ? 1000 : _ref$downDuration;
  var currentSegment = "";
  var isStarted = false;

  var _useState = useState(false),
    isFinished = _useState[0],
    setFinished = _useState[1];

  var timerHandle = 0;
  var timerDelay = segments.length;
  var angleCurrent = 0;
  var angleDelta = 0;
  var canvasContext = null;
  var maxSpeed = Math.PI / ("" + segments.length);
  var upTime = segments.length * upDuration;
  var downTime = segments.length * downDuration;
  var spinStart = 0;
  var frames = 0;
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

  useEffect(() => {
    spin();
  }, [spin]);

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

  var spin = function () {
    isStarted = true;

    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  var onTimerTick = function onTimerTick() {
    frames++;
    draw();
    var duration = new Date().getTime() - spinStart;
    var progress = 0;
    var finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }

      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;

    while (angleCurrent >= Math.PI * 2) {
      angleCurrent -= Math.PI * 2;
    }

    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
      props.setDoneSpinning(true);
    }
  };

  var wheelDraw = function wheelDraw() {
    clear();
    drawWheel();
    drawNeedle();
  };

  var draw = function draw() {
    clear();
    drawWheel();
    drawNeedle();
  };

  var drawSegment = function drawSegment(key, lastAngle, angle) {
    var ctx = canvasContext;
    var value = segments[key].item;
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
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 1em proxima-nova";
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  var drawNeedle = function drawNeedle() {
    var ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
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
        pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
      },
    })
  );
}
