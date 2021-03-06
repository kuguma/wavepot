
/*
 * ikachan (by studiopixel : http://studiopixel.sakura.ne.jp/)
 * 
 * please execute in http://wavepot.com/
 */

//note_data
var melody = [
  
  [76,-1,-1,-1,76,-1,77,-1,-1,77,76,-1,74,-1,72,-1],
  [74,-1,-1,-1,79,-1,79,-1,-1,-1,-1,-1,76,-1,-1,-1],
  [81,-1,-1,-1,81,-1,84,-1,-1,84,83,-1,81,-1,79,-1],
  [76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,74,-1,76,-1],
  
  [77,-1,-1,-1,77,-1,76,77,-1,76,74,-1,72,-1,74,72],
  [74,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,74,-1,76,-1],
  [77,-1,-1,-1,77,-1,76,77,-1,76,74,-1,72,-1,79,72],
  [79,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  
];

var sub = [
  
  [55,-1,55,-1,60,-1,55,-1,62,-1,60,-1,59,-1,60,-1],
  [55,-1,55,-1,59,-1,55,-1,60,-1,59,-1,57,-1,59,-1],
  [52,-1,52,-1,57,-1,52,-1,60,-1,59,-1,57,-1,59,-1],
  [52,-1,52,-1,55,-1,52,-1,57,-1,55,-1,52,-1,55,-1],
  
  [48,-1,53,-1,57,-1,53,-1,60,-1,59,-1,57,-1,59,-1],
  [50,-1,55,-1,59,-1,55,-1,62,-1,60,-1,59,-1,60,-1],
  [48,-1,53,-1,57,-1,53,-1,60,-1,59,-1,57,-1,59,-1],
  [60,55,-1,-1,59,55,-1,-1,60,55,-1,-1,62,55,-1,-1],
  
];

var bass = [
  
  [43,-1,43,-1,48,-1,-1,-1,50,-1,50,-1,48,-1,-1,-1],
  [43,-1,43,-1,47,-1,-1,-1,48,-1,48,-1,47,-1,-1,-1],
  [40,-1,40,-1,45,-1,-1,-1,48,-1,48,-1,45,-1,-1,-1],
  [40,-1,40,-1,43,-1,43,-1,45,-1,45,-1,43,-1,-1,-1],
  
  [36,-1,36,-1,41,-1,-1,-1,43,-1,43,-1,41,-1,-1,-1],
  [38,-1,38,-1,43,-1,-1,-1,47,-1,47,-1,43,-1,-1,-1],
  [36,-1,36,-1,41,-1,-1,-1,43,-1,43,-1,41,-1,-1,-1],
  [43,-1,-1,-1,43,-1,-1,-1,43,-1,-1,-1,43,-1,-1,-1],
   
];


//param
var bpm = 120;
var time_n = 16;
var time_d = 16 /4;
var loop = 8;


function dsp(t) {
  //init
  var bar = 0;
  var beat = 0;

  //beat
  bar = ~~((t*(bpm/60/time_d))%loop);
  beat = ~~((t*(bpm/60)*time_d)%time_n);

  
  return 0.1 * t1(t,bar,beat)
  + 0.05 * t2(t,bar,beat)
  + 0.05 * t3(t,bar,beat)
  ;
}

function t1(t,bar,beat) {
  return midi_delay(t,bar,beat,melody,sqr) ;//+ 0.4*smart_chorus(t,bar,beat,melody,saw);
}

function t2(t,bar,beat) {
  return midi_delay(t,bar,beat,sub,saw);
}

function t3(t,bar,beat) {
  return midi_delay(t,bar,beat,bass,sin);
}


//------------------------------------

function midi_delay(t,bar,beat,midi,func) {
  return func(ntf(midi[bar][beat]),t)
    + 0.3*func(ntf(midi[bar][beat-3]),t)
    + 0.1*func(ntf(midi[bar][beat-6]),t)
    + 0.05*func(ntf(midi[bar][beat-9]),t)
  ;
}

function smart_chorus(t,bar,beat,midi,func) {
  var h = [8,0,9,0,9,8,0,7,0,9,0,9];
  var note = midi[bar][beat];
  var n = ~~(note%12);
  return func(ntf(note-h[n]),t)
  ;
}

function sin(f, t) {
  return Math.sin(2 * Math.PI * f *t);
}

function saw(f, t) {
  return 1 - 2 * (t % (1/f)) * f;
}

function sqr(f, t){
  return sin(f, t) > 0 ? 1 : -1;
}

function ntf(note) {
  return (note>0) ? 440 * Math.pow(2.0, (note - 69) / 12) : 0;
}