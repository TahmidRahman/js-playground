function staircase(n) {
  for (let i = 1; i <= n; i++) {
    let spaces = "";
    let hashes = "";

    for (let j = 1; j <= n - i; j++) {
      spaces += " ";
    }

    for (let j = 1; j <= i; j++) {
      hashes += "#";
    }

    const line = spaces + hashes + "\n";
    // process.stdout.write(line);
  }
}
