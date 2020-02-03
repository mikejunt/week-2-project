(function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  let pos = { x: 0, y: 0 };
  let drawcolor = [0, 0, 0];
  let customcolor = [];

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);

  function setPosition(e) {
    pos.x = e.clientX - 15;
    pos.y = e.clientY - 50;
  }

  function resize() {
    let holder = document.getElementById("holder");
    ctx.canvas.width = holder.clientWidth;
    ctx.canvas.height = holder.clientHeight;
  }

  function draw(e) {
    if (e.buttons !== 1) return;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgb( ${drawcolor[0]},${drawcolor[1]},${drawcolor[2]})`;
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  (function () {
    let white = [255, 255, 255];
    let black = [0, 0, 0];
    customcolor = [];
    let startcolors = document.getElementsByClassName("options");

    for (let i = 0; i < 3; i++) {
      customcolor = Object.assign(customcolor, black);
      customcolor[i] = white[i];
      startcolors[i].style.backgroundColor = `rgb(${customcolor[0]},${customcolor[1]},${customcolor[2]})`
      const mycolor = [];
      Object.assign(mycolor, customcolor);
      startcolors[i].addEventListener("click", function () {
        drawcolor = mycolor;
      })
    }
  })()

  let redslider = document.getElementById("customred");
  let greenslider = document.getElementById("customgreen");
  let blueslider = document.getElementById("customblue");
  customcolor = [77, 20, 140]
  let redfeedback = document.getElementById("redvalue");
  let greenfeedback = document.getElementById("greenvalue");
  let bluefeedback = document.getElementById("bluevalue");

  redfeedback.innerHTML = redslider.value;
  redslider.oninput = function () {
    redfeedback.innerHTML = this.value;
    customcolor[0] = this.value;
  }

  greenfeedback.innerHTML = greenslider.value;
  greenslider.oninput = function () {
    greenfeedback.innerHTML = this.value;
    customcolor[1] = this.value;
  }

  bluefeedback.innerHTML = blueslider.value;
  blueslider.oninput = function () {
    bluefeedback.innerHTML = this.value;
    customcolor[2] = this.value;
  }

  document.getElementById("colormaker").addEventListener("click", function () {
    const makecolor = [];
    Object.assign(makecolor, customcolor);
    let nextcircle = document.createElement("div");
    let circleholder = document.getElementById("colorpicker");
    circleholder.appendChild(nextcircle);
    nextcircle.classList.add("options");
    nextcircle.style.backgroundColor = `rgb(${makecolor[0]},${makecolor[1]},${makecolor[2]})`
    nextcircle.addEventListener("click", function () {
      drawcolor = makecolor;
    })
  })

  document.getElementById("reset").addEventListener("click", function () { resize() })

  resize()
})()
