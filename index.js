import { eventCode, keysEng, keysRus } from "./components/keys.js"

const body = document.querySelector("body")
let ctrlIsDown = false;
let capsIsEnable = false;
let keys = document.getElementsByClassName("keyboard__key");

document.addEventListener('keydown', function (event) {
  if (true) {
    event.preventDefault();
  }
}, false);

function newElement(tag, cssClass) {
  let element = document.createElement(tag);
  element.classList.add(cssClass)
  return element
}




function init() {

  let container = newElement("div", "container")
  body.prepend(container)

  let title = newElement("div", "title")
  title.innerText = "RSS Виртуальная клавиатура"
  container.append(title)

  let textarea = newElement("textarea", "textarea")
  container.append(textarea)

  let keyboard = newElement("div", "keyboard")
  container.append(keyboard)
  for (let i = 0; i < eventCode.length; i++) {
    let keyboardRow = newElement("div", "keyboard__row")
    keyboard.append(keyboardRow)
    for (let j = 0; j < eventCode[i].length; j++) {
      let keyboardKey = newElement("div", "keyboard__key")
      keyboardKey.setAttribute("id", eventCode[i][j]);
      (keysEng[i][j].length < 3) ? keyboardKey.innerText = keysEng[i][j][0] : keyboardKey.innerText = keysEng[i][j]; // If length more than 2 it means there is special key
      keyboardRow.append(keyboardKey)

    }

  }

  let aboutOS = newElement("div", "aboutOS")
  aboutOS.innerText = "Клавиатура создана в операционной системе Windows"
  container.append(aboutOS)

  let switchLang = newElement("div", "switch-lang")
  switchLang.innerText = "Для переключения языка комбинация: левыe ctrl + alt"
  container.append(switchLang)


}

init()

// change active key during keydown
document.addEventListener("keydown", (event) => {
  let activeKey = document.getElementById(event.code);
  activeKey.classList.add("active")
});

document.addEventListener("keyup", (event) => {
  let activeKey = document.getElementById(event.code);
  activeKey.classList.remove("active")
});

document.querySelectorAll(".keyboard__key").forEach(elem => {
  elem.addEventListener("mousedown", function (event) {
    let code = this.getAttribute("id")
    this.classList.add("active")
  })
  elem.addEventListener("mouseup", function (event) {
    let code = this.getAttribute("id")
    this.classList.remove("active")
  })
});


// change lang
document.addEventListener("keydown", function (event) {
  if (event.key == "Control") ctrlIsDown = true;
  if (event.key == "Alt" && ctrlIsDown) {
    ctrlIsDown = false;
    if (document.getElementById("KeyQ").innerHTML === "q" || document.getElementById("KeyQ").innerHTML === "Q") {
      for (let i = 0; i < keys.length; i++) {
        let arrayRusKeys = [].concat(...keysRus);
        (arrayRusKeys[i].length < 3) ? keys[i].innerHTML = arrayRusKeys[i][0] : keys[i].innerHTML = arrayRusKeys[i];
      }
    } else if (document.getElementById("KeyQ").innerHTML === "й" || document.getElementById("KeyQ").innerHTML === "Й") {
      for (let i = 0; i < keys.length; i++) {
        let arrayEngKeys = [].concat(...keysEng);
        (arrayEngKeys[i].length < 3) ? keys[i].innerHTML = arrayEngKeys[i][0] : keys[i].innerHTML = arrayEngKeys[i];
      }
    }
  }
});

// change keys while shift is down
document.addEventListener("keydown", function (event) {
  if (event.key == "Shift") {
    if (document.getElementById("KeyQ").innerHTML === "й" || document.getElementById("KeyQ").innerHTML === "Й") {
      for (let i = 0; i < keys.length; i++) {
        let arrayRusKeys = [].concat(...keysRus);
        (arrayRusKeys[i].length < 3) ? keys[i].innerHTML = arrayRusKeys[i][1] : keys[i].innerHTML = arrayRusKeys[i];
      }
    } else if (document.getElementById("KeyQ").innerHTML === "q" || document.getElementById("KeyQ").innerHTML === "Q") {
      for (let i = 0; i < keys.length; i++) {
        let arrayEngKeys = [].concat(...keysEng);
        (arrayEngKeys[i].length < 3) ? keys[i].innerHTML = arrayEngKeys[i][1] : keys[i].innerHTML = arrayEngKeys[i];
      }
    }
  }
})

document.addEventListener("keyup", function (event) {
  if (event.key == "Shift") {
    if (document.getElementById("KeyQ").innerHTML === "й" || document.getElementById("KeyQ").innerHTML === "Й") {
      for (let i = 0; i < keys.length; i++) {
        let arrayRusKeys = [].concat(...keysRus);
        (arrayRusKeys[i].length < 3) ? keys[i].innerHTML = arrayRusKeys[i][0] : keys[i].innerHTML = arrayRusKeys[i];
      }
    } else if (document.getElementById("KeyQ").innerHTML === "q" || document.getElementById("KeyQ").innerHTML === "Q") {
      for (let i = 0; i < keys.length; i++) {
        let arrayEngKeys = [].concat(...keysEng);
        (arrayEngKeys[i].length < 3) ? keys[i].innerHTML = arrayEngKeys[i][0] : keys[i].innerHTML = arrayEngKeys[i];
      }
    }
  }
})


// change keys while caps is down
document.addEventListener("keydown", function (event) {
  if (event.key == "CapsLock") {
    if (capsIsEnable === false) {
      capsIsEnable = true;
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].innerHTML.length === 1 && keys[i].innerHTML.match(/[a-zа-яё]/))
          keys[i].innerHTML = keys[i].innerHTML.toUpperCase()
      }

    } else if (capsIsEnable === true) {
      capsIsEnable = false;
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].innerHTML.length === 1 && keys[i].innerHTML.match(/[A-ZА-ЯЁ]/))
          keys[i].innerHTML = keys[i].innerHTML.toLowerCase()
      }
    }
  }

})

// add sign in textarea when key is pressed
document.addEventListener("keydown", (event) => {
  let textarea = document.querySelector(".textarea");
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].id === event.code && event.key.length < 2) {
      textarea.setRangeText(`${keys[i].innerHTML}`);
      textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
    }
  }
  if (event.code === "Enter") {
    textarea.setRangeText(`${"\n"}`);
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
  }
  if (event.code === "Tab") {
    textarea.setRangeText(`${"    "}`);
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 4;
  }
  if (event.code === "ArrowLeft") {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 1;
  }
  if (event.code === "ArrowUp") {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 96;
  }
  if (event.code === "ArrowRight") {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
  }
  if (event.code === "ArrowDown") {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 96;
  }
  if (event.code === "Backspace") {
    textarea.setRangeText("", textarea.selectionStart - 1, textarea.selectionEnd);
  }
  if (event.code === "Delete") {
    textarea.setRangeText("", textarea.selectionStart, textarea.selectionEnd + 1);
  }
})

document.querySelectorAll(".keyboard__key").forEach(elem => {

});








