let intervalId;
 
document.addEventListener('mainLoaded', () => {
    const pageActive = window.location.hash.replace("#", "")
        
    if(pageActive == '/'){
        homeFuctions();
    }
    else{
        stopInterval(intervalId)
        if(pageActive == '/projects'){
            projectFunctions()
        }
    }
})

/* Home Page Functions */
function homeFuctions() {
    startInterval()
    var sliderContainer = document.getElementById("images-slider")

    sliderContainer.addEventListener("mouseenter", () => stopInterval(intervalId));

    sliderContainer.addEventListener("mouseleave", () => startInterval());   
}

function nextSlide() {
    var slides = document.getElementById("slides");
    slides.classList.add("animation-right")
    setTimeout(() => {
        slides.classList.remove("animation-right")
        var pastSlide = slides.children[0] 
        slides.appendChild(pastSlide) 
    }, 500)
}

function previousSlide(){
    var slides = document.getElementById("slides");
    slides.classList.add("animation-left")
    setTimeout(() => {
        slides.classList.remove("animation-left")
        var pastSlide = slides.lastElementChild;
        slides.insertBefore(pastSlide, slides.children[0]);
    }, 500)
}

function stopInterval(id) {
    clearInterval(id)
}

function startInterval(){
    intervalId = setInterval(()=> { nextSlide() }, 5000);
}

function playPause(){
    var video = document.getElementById("company-video")
    var playIcon = document.getElementsByClassName("play-icon")[0]
    playIcon.classList.toggle("hidden")
    
    if(video.paused){
        video.play()
    }
    else{
        video.pause()
    }
}

/* Project Page Functions */
function projectFunctions(){
    var buttons = document.querySelectorAll('.card-btn')

    buttons.forEach(btn => btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card')
        const cardText = card.querySelector('.card-text-container')
        
        if(cardText.getAttribute('expanded') != null){
            cardText.removeAttribute('expanded')
        }
        else{
            cardText.setAttribute('expanded', '')
        }
    }))
}

function closeCard(e) {
    //
}