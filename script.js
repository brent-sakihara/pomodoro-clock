let count = 0;
let minutes = 0;
class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      session: 25,
      break: 5,
      seconds: 0,
      clock: "A"
    };
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.displaySeconds = this.displaySeconds.bind(this);
    this.displayLabel = this.displayLabel.bind(this);
    this.displayMinutes = this.displayMinutes.bind(this);
    this.runStop = this.runStop.bind(this);
     this.run = this.run.bind(this); 
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.beep = this.beep.bind(this);
    this.switch = this.switch.bind(this);
  }
  
  increaseSession(){
    if(this.state.session < 60){
      this.setState({
      session: this.state.session + 1
    });
    }
  }
  
  decreaseSession(){
    if (this.state.session > 1){
      this.setState({
      session: this.state.session - 1
    });
    }
  }
  
  increaseBreak(){
    if (this.state.break < 60){
     this.setState({
      break: this.state.break + 1
    }); 
    }
  }
  
  decreaseBreak(){
    if (this.state.break > 1){
     this.setState({
      break: this.state.break - 1
    }); 
    }
  }
  
  displaySeconds(){
    if (this.state.seconds < 10){
      return "0" + this.state.seconds;
    }
    return this.state.seconds;
  }
  
  displayMinutes(){
   if (this.state.clock == "A"){
     if(this.state.session - minutes >= 10){
       return this.state.session - minutes;
     }
    return "0" + (this.state.session - minutes);
   }
    else{
      if (this.state.break - minutes >= 10){
      return this.state.break - minutes;   
}
     return "0" + (this.state.break - minutes);
    }
  }
  
  displayLabel(){
    if(this.state.clock == "A"){
      return "Session";
    }
    return "Break";
  }
 
  runStop(){
    count++;
    if(count % 2 == 1){
      this.run();
    }
    else{
      this.stop();
    }
  }
  
  run(){
    this.timer = setInterval(()=>{
      if (this.state.seconds > 0){
        this.setState({
          seconds: this.state.seconds -1
        });
      }
      else{
        if(this.displayMinutes() > 0){
          minutes++;
          this.setState({
            seconds: 59
          });
        }
        else{
          minutes = 0;
          this.beep();
          if(this.state.clock == "A"){
            this.setState({
              clock: "B",
              seconds: 0
            });
          }
          else{
            this.setState({
              clock: "A",
              seconds: 0
            });
          }
        }
      }
    },1000);
} 
  
  stop(){
    clearInterval(this.timer);
  }
  
reset(){
  count = 0;
  minutes = 0;
  clearInterval(this.timer);
  this.setState({
    clock: "A",
    seconds: 0,
    session: 25,
    break: 5
  });
  this.audioBeep.pause();
  this.audioBeep.currentTime = 0;
}
  
  beep(){
    this.audioBeep.play();
  }
  
  switch(stateTo){
    minutes = 0;
    if (stateTo == "A"){
      this.setState({
        clock: "A",
        seconds: 0
      });
    }
    else{
      this.setState({
        clock: "B",
        seconds: 0
      });
    }
  }
  
  render(){
    return(
    <div id = "everything">
        
        <div id = "timer">
          <h2 id = "timer-label">{this.displayLabel()} Time Remaining:</h2>
          <h1 id = "time-left">{this.displayMinutes()}:{this.displaySeconds()}</h1>
          <button id = "start_stop" onClick = {this.runStop}><i class="far fa-play-circle"></i>   <i class="far fa-pause-circle"></i></button>
          <button id = "reset" onClick = {this.reset}><i class="fas fa-undo"></i></button>
        </div>
        
      <div id = "work" >
        <button onClick = {() => this.switch("A")} id = "session-label">
          Session
        </button>
        <div class = "numbers">
          <h2 class = "time" id = "session-length">{this.state.session}</h2><h2 class = "time">:00</h2>
        </div>
        <div className = "buttons">
          <button id = "session-decrement" onClick = {this.decreaseSession}>
            <i className="fas fa-arrow-alt-circle-down"></i>
          </button>
          <button id = "session-increment" onClick = {this.increaseSession}>
            <i className="fas fa-arrow-alt-circle-up up"></i>
          </button>
        </div>
       </div>
        
        <div id = "break">
          <button onClick = {() => this.switch("B")} id = "break-label">
            Break
          </button>
          <div class = "numbers">
          <h2 class = "time" id = "break-length">{this.state.break}</h2><h2 class = "time">:00</h2>
        </div>
          <div className = "buttons">
          <button id = "break-decrement" onClick = {this.decreaseBreak}>
            <i className="fas fa-arrow-alt-circle-down"></i>
          </button>
          <button id = "break-increment" onClick = {this.increaseBreak}>
            <i className="fas fa-arrow-alt-circle-up up"></i>
          </button>
        </div>
        </div>
        
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
     </div>
    );
  }
}

ReactDOM.render(<Pomodoro/>, document.getElementById("app"));