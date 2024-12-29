document.getElementById("start-button").addEventListener("click", () => {
  const daysVal = parseInt(document.getElementById("days-input").value) || 0;
  const hoursVal = parseInt(document.getElementById("hours").value) || 0;
  const minutesVal = parseInt(document.getElementById("minutes").value) || 0;
  const secondsVal = parseInt(document.getElementById("seconds").value) || 0;

  const totalSeconds = (daysVal * 86400) + (hoursVal * 3600) + (minutesVal * 60) + secondsVal;

  if (totalSeconds > 0) {

    const popup = document.getElementById("fullscreen-popup");
    popup.classList.remove('hidden');
    
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.classList.add('hidden'), 300);
    }, 3000);

    document.getElementById("title").style.display = 'none';
    document.getElementById("input-heading").style.display = 'none';





    document.getElementById("title").style.display = 'none';
    document.getElementById("input-heading").style.display = 'none';
    
    document.getElementById("input-container").style.display = 'none';
    document.getElementById("countdown1").classList.remove('hidden');
    
    startCountdown(totalSeconds);
  }
});

function startCountdown(totalSeconds) {
  let previousValues = {
    daysTens: -1, daysOnes: -1,
    hoursTens: -1, hoursOnes: -1,
    minutesTens: -1, minutesOnes: -1,
    secondsTens: -1, secondsOnes: -1
  };

  const beepSound = document.getElementById("beep-sound"); 




  const interval = setInterval(() => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const daysTens = Math.floor(days / 10);
    const daysOnes = days % 10;
    updateDigit('days-tens', daysTens, previousValues.daysTens);
    updateDigit('days-ones', daysOnes, previousValues.daysOnes);
    previousValues.daysTens = daysTens;
    previousValues.daysOnes = daysOnes;



    const hoursTens = Math.floor(hours / 10);
    const hoursOnes = hours % 10;
    updateDigit('hours-tens', hoursTens, previousValues.hoursTens);
    updateDigit('hours-ones', hoursOnes, previousValues.hoursOnes);
    previousValues.hoursTens = hoursTens;
    previousValues.hoursOnes = hoursOnes;

    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    updateDigit('minutes-tens', minutesTens, previousValues.minutesTens);
    updateDigit('minutes-ones', minutesOnes, previousValues.minutesOnes);
    previousValues.minutesTens = minutesTens;
    previousValues.minutesOnes = minutesOnes;

    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;
    updateDigit('seconds-tens', secondsTens, previousValues.secondsTens);
    updateDigit('seconds-ones', secondsOnes, previousValues.secondsOnes);
    previousValues.secondsTens = secondsTens;
    previousValues.secondsOnes = secondsOnes;

    document.querySelectorAll('.digitgroup').forEach((group, index) => {
      const value = [days, hours, minutes, seconds][index];
      group.querySelector('.one').style.display = value === 1 ? 'inline' : 'none';
      group.querySelector('.many').style.display = value !== 1 ? 'inline' : 'none';
    });

    if (totalSeconds <= 0) {
      clearInterval(interval);
      beepSound.play(); 
      alert("Time's up!");
    }

    totalSeconds--;
  }, 1000);
}




function updateDigit(elementId, newValue, oldValue) {
  const element = document.getElementById(elementId);
  if (newValue !== oldValue) {
    element.textContent = newValue;
    element.classList.remove('pop');
    void element.offsetWidth; 
    element.classList.add('pop');
  }
}

