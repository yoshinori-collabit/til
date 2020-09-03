const array2 = Array.from(document.querySelectorAll('.problem-box__data > dd:nth-of-type(3)')).map(elem => elem.innerText).map(str => str.match(/[\d\.+]+/)[0]).map(str => parseFloat(str))

const array = Array.from($x('//dl[@class="problem-box__data"]/dt[contains(text(), "平均スコア")]/following-sibling::dd[1]')).map(elem => elem.innerText.match(/[\d\.]+/)[0]).map(str => parseFloat(str))

const avg = (array) => array.reduce((sum,value) => sum + value) / array.length
