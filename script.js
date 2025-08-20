document.getElementById("toggleIngredients").addEventListener("click", function () {
    let ingredients = document.getElementById("ingredients");
    ingredients.classList.toggle("hidden");
    this.textContent = ingredients.classList.contains("hidden")
      ? "Show Ingredients"
      : "Hide Ingredients";
  });
  
  document.getElementById("toggleSteps").addEventListener("click", function () {
    let steps = document.getElementById("steps");
    steps.classList.toggle("hidden");
    this.textContent = steps.classList.contains("hidden")
      ? "Show Steps"
      : "Hide Steps";
  });

  let steps = document.querySelectorAll("#steps li");
  let currentStep = 0;
  let totalSteps = steps.length;
  let totalMinutes = parseInt(document.getElementById("prepTime").textContent);
  let totalSeconds = totalMinutes * 60;
  let timePerStep = Math.floor(totalSeconds / totalSteps);
  let timerInterval;
  
  document.getElementById("startCooking").addEventListener("click", function () {
    if (steps.length > 0) {
      document.getElementById("steps").classList.remove("hidden");
      steps[0].style.background = "#d4f3d9";
  
      document.getElementById("nextStep").classList.remove("hidden");
      this.classList.add("hidden");
  
      let timerDiv = document.getElementById("timer");
      timerDiv.classList.remove("hidden");
  
      updateProgress(0);
      startCountdown();
    }
  });
  
  document.getElementById("nextStep").addEventListener("click", function () {
    if (currentStep < totalSteps - 1) {
      steps[currentStep].style.background = "none";
      currentStep++;
      steps[currentStep].style.background = "#d4f3d9";
      totalSeconds -= timePerStep;
      updateProgress(((currentStep) / totalSteps) * 100);
      if (currentStep === totalSteps - 1) {
        this.textContent = "Done";
      }
    } else {
        this.classList.add("hidden");
        clearInterval(timerInterval); 
        updateProgress(100);
        totalSeconds = 0;
        document.getElementById("timeLeft").textContent = "00:00";
        document.getElementById("completionModal").classList.remove("hidden");
        document.getElementById("closeModal").addEventListener("click", () => {
          location.reload();
        });
      }     
  });  
  function startCountdown() {
    let timeLeft = document.getElementById("timeLeft"); 
    function updateDisplay() {
      let mins = Math.floor(totalSeconds / 60);
      let secs = totalSeconds % 60;
      timeLeft.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    } 
    updateDisplay();
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        timeLeft.textContent = "Time's up! 🎂";
      }
    }, 1000);
  }
  function updateProgress(percent) {
    document.getElementById("progressBar").style.width = percent + "%";
  }
  
  