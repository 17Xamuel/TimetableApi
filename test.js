let arr = [[1], [], [{}], [4], [], [], [{ v: 3 }]];

let filtered = arr.filter((el) => el.length > 0);

for (let i = 0; i < filtered.length; i++) {
  console.log(arr.indexOf(filtered[i]));
}
