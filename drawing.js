(function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  let pos = { x: 0, y: 0 };
  let drawcolor = [255, 0, 0];
  let customcolor = [];
  let lastcircle = document.querySelector(".options");
  let stroke = 5;
  let redslider = document.getElementById("customred");
  let greenslider = document.getElementById("customgreen");
  let blueslider = document.getElementById("customblue");
  let redfeedback = document.getElementById("redvalue");
  let greenfeedback = document.getElementById("greenvalue");
  let bluefeedback = document.getElementById("bluevalue");
  let swatch = document.getElementById("swatch");
  let brush = document.getElementById("brush");
  let brushdisplay = document.getElementById("brushdisplay");

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
    ctx.lineWidth = stroke;
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
        lastcircle.classList.remove("selected");
        drawcolor = mycolor;
        this.classList.add("selected");
        lastcircle = this;
      })
    }
    document.querySelector(".options").classList.add("selected");
    customcolor = [77, 20, 140]
  })()

  swatch.style.backgroundColor = `rgb(${customcolor[0]},${customcolor[1]},${customcolor[2]})`;
  
  redfeedback.innerHTML = redslider.value;
  redslider.oninput = function () {
    redfeedback.innerHTML = this.value;
    customcolor[0] = this.value;
    swatch.style.backgroundColor = `rgb(${customcolor[0]},${customcolor[1]},${customcolor[2]})`;
  }

  greenfeedback.innerHTML = greenslider.value;
  greenslider.oninput = function () {
    greenfeedback.innerHTML = this.value;
    customcolor[1] = this.value;
    swatch.style.backgroundColor = `rgb(${customcolor[0]},${customcolor[1]},${customcolor[2]})`;
  }

  bluefeedback.innerHTML = blueslider.value;
  blueslider.oninput = function () {
    bluefeedback.innerHTML = this.value;
    customcolor[2] = this.value;
    swatch.style.backgroundColor = `rgb(${customcolor[0]},${customcolor[1]},${customcolor[2]})`;
  }

  brush.oninput = function () {
    brushdisplay.style.height = `${brush.value}px`;
    brushdisplay.style.width = `${brush.value}px`;
    stroke = this.value;
  }

  document.getElementById("colormaker").addEventListener("click", function () {
    const makecolor = [];
    Object.assign(makecolor, customcolor);
    drawcolor = makecolor;
    lastcircle.classList.remove("selected");
    let nextcircle = document.createElement("div");
    let circleholder = document.getElementById("colorpicker");
    circleholder.appendChild(nextcircle);
    nextcircle.classList.add("options", "selected");
    nextcircle.style.backgroundColor = `rgb(${makecolor[0]},${makecolor[1]},${makecolor[2]})`;
    lastcircle = nextcircle;
    nextcircle.addEventListener("click", function () {
      lastcircle.classList.remove("selected");
      drawcolor = makecolor;
      this.classList.add("selected");
      lastcircle = this;
    })
  })

  document.getElementById("reset").addEventListener("click", function () { resize() })

  resize()
})()
