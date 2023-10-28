await Bun.build({
  entrypoints: ['./public/main.js'],
  outdir: './dist',
  minify: true,
})
console.log('ok')
