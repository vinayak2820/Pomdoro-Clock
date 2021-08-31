var inc_session = document.getElementById("inc_session");
var dec_session = document.getElementById("dec_session");
var inc_break = document.getElementById("inc_break");
var dec_break = document.getElementById("dec_break");
var start = document.getElementById("start");
var reset = document.getElementById("reset");
var pause = document.getElementById("pause");
var session_time = document.getElementById("session_time");
var break_time = document.getElementById("break_time");
var curr_time = document.getElementById("curr_time");

var time = 20;
var brk = 5;
var curr = 0;
var require_time;
var timer;

var break_started=false;

inc_session.addEventListener("click", () => {
  session_time.innerText=time+1;
  time++;
});

dec_session.addEventListener("click", () => {
  if(time>0){
    session_time.innerText = time-1;
    time--;
  }
});

inc_break.addEventListener("click", () => {
  break_time.innerText=++brk;
});

dec_break.addEventListener("click", () => {
  if(brk>0)
    break_time.innerText=--brk;
});


start.addEventListener("click", () => {
  start.style.display="none";
  pause.style.display="inline-block";

  inc_session.disabled = true;
  inc_break.disabled = true;
  dec_session.disabled = true;
  dec_break.disabled = true;

  require_time=time*60;


  timer= setInterval(() => {
    if(curr<=require_time){
      var min = Math.floor(curr/60);

      if(min<10) min = `0${min}`
      var sec = (curr-min*60);

      if(sec<10) sec = `0${sec}`
      curr_time.innerText=`${min} : ${sec}`;

      curr++;
    }
    else{
      curr_time.style.color="red";
      break_started = true;
      require_time=brk*60;
      curr=0;
    }
  }, 1000);
 
})

pause.addEventListener("click", () => {
  start.style.display="inline-block";
  pause.style.display="none";

  clearInterval(timer);
  if(break_started){
    console.log("break_started");
    require_time=brk*60;
  } else {
      require_time=time*60;
  }
})

reset.addEventListener("click", () => {
  time = 20;
  curr=0;
  curr_time.style.color="skyblue";
  curr_time.innerText = `00:00`;
  clearInterval(timer);
  start.style.display="inline-block";
  pause.style.display="none";
  inc_session.disabled = false;
  inc_break.disabled = false;
  dec_session.disabled = false;
  dec_break.disabled = false;
})
