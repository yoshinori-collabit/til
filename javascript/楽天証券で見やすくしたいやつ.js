// スーパースクリーナーのテーブルを利用
let rows = Array.from(document.querySelectorAll(".datarow"));

rows.forEach((row) => {
  const haitouRate = parseFloat(row.querySelector(".a1").textContent) / 100;
  const kabuka = parseFloat(row.querySelector(".l").textContent);
  const haitouPerKabu = kabuka * haitouRate;
  const eps = parseFloat(row.querySelector(".a2").textContent);
  const haitouSeikou = Math.round((haitouPerKabu / eps) * 10000) / 10000;

  //   row.querySelector(".a3").textContent = haitouSeikou.toString();
  const td = document.createElement("td");
  row.appendChild(td);
  td.textContent = `配当性向: ${haitouSeikou} 配当単価: ${haitouPerKabu}`;
  if (haitouSeikou >= 0.3) {
    row.style.backgroundColor = "green";
  }
});
