// Followed the code of  https://github.com/ronami/minipack.git

const { readFileSync } = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const { transformFromAst } = require('babel-core');

let ID = 0;

function createAsset(filename) {
  const content = readFileSync(filename, 'utf-8');
  const contentAST = babylon.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];

  traverse(contentAST, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const id = ID++;
  const { code } = transformFromAst(contentAST, null, {
    presets: ['env'],
  });

  return {
    id,
    filename,
    code,
    dependencies,
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

function bundle(graph) {
  let modules = '';
  graph.forEach((mod) => {
    modules += `${mod.id}: [
      function(require,module,exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`;
  });

  const output = `(function(modules) {
    function require(id) {
      const [fn, mapping] = modules[id];

      function localRequire(name) {
        return require(mapping[name]);
      }

      const module = { exports: {}};
      fn(localRequire,module,module.exports);
      return module.exports; 
    }
    require(0); 
  })({${modules}})`;
  return output;
}
const graph = createGraph('./example/entry.js');
const bundleOutput = bundle(graph);
console.log(bundleOutput);
