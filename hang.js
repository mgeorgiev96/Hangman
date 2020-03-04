let display = document.querySelector(".display")
let attempts = 8
let count = 0
let guess = document.querySelector(".guess")
let button = document.querySelector("button")
let history = document.querySelector(".history")
let arrHist = []




let word

const fetchWord = fetch("https://puzzle.mead.io/puzzle").
then(data=>data.json()).
then(data=>word = data.puzzle.split(""))

const hook = async ()=>{
    await fetchWord
    for(let i=0;i<word.length;i++){
        if(word[i]===" " || i===0 || word[i].toUpperCase()===word[0].toUpperCase()){
          display.innerHTML += `<p class=${word[i].toUpperCase()} class="empty">${word[i].toUpperCase()}</p>`
        }else{
          display.innerHTML += `<p class=${word[i].toUpperCase()}>*</p>` 
        }
  guess.innerHTML = `Guesses left: ${attempts}`
}
}

hook()
const revealChar = (e)=>{
  let noSpace = word.join("").replace(/[ ]/g,"")
  let key = e.key.toUpperCase()
  let p = document.getElementsByTagName("p")
  let c = false
  for(let i=0;i<p.length;i++){
    if(p[i].classList[0]===key){
      p[i].innerHTML = p[i].classList[0]
       p[i].style.border ="none"
       p[i].style.opacity ="1"
      count+=1
      c = true
      p[i].classList.remove(`${p[i].classList[0]}`)
    }
  }
   history.innerHTML += `${key}, `
  if(!c){
    attempts--
  }
  if(attempts<1){
    alert(`You have runned out of attemps. The word is: ${word.join("")}.`)
    window.location.reload()
  }else if(count===noSpace.length){
    alert("Congratulations!")
    window.location.reload()
  }
  guess.innerHTML = `Guesses left: ${attempts}`
}

const newGame= ()=>{
  window.location.reload()
}


window.addEventListener("keydown",revealChar)
button.addEventListener("click",newGame)