// Tinder 自動swipeを派生させて、画像のURL抜き出しまで
const nopeBtn = document.querySelector('[aria-label="いいえ"]');
const likeBtn = document.querySelector('[aria-label="いいね！"]');
let timer = null;

const searchFunction = () => {
  timer = setInterval(() => {
    let age = parseInt(
      document.querySelectorAll('[itemprop="age"]')[1].textContent
    );
    let name = document.querySelectorAll('[itemprop="name"]')[1].textContent;
    let imageUrl = document.querySelector(".recsCardboard__cards").children[2]
      .children[0].children[0].children[0].children[0].style.backgroundImage;
    console.log(`${name}: ${age}歳`);
    // console.log(imageUrl);
    console.log(imageUrl.match(/url\(\"(.+)\"\)/)[1]);
    if ([25, 26].includes(age)) {
      // clearInterval(timer);
      nopeBtn.click();
    } else {
      nopeBtn.click();
    }
  }, 400);
};

searchFunction();
