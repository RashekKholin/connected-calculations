const fs=require('fs'),path=require('path');const dir=__dirname;
let html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
html=html.replace(/<link rel="stylesheet" href="style\.css(?:\?[^\"]*)?">/,()=>'<style>'+fs.readFileSync(path.join(dir,'style.css'),'utf8')+'</style>');
for(const name of ['engine','sciences','expanded','ap-library','math-tools','catalogue-units','scalar-inverses','library-growth','precision','planner','chemistry','app','target-ui','data-ui','ap-reference'])html=html.replace(new RegExp(`<script src="${name}\\.js(?:\\?[^\"]*)?"></script>`),()=>'<script>'+fs.readFileSync(path.join(dir,name+'.js'),'utf8')+'</script>');
fs.writeFileSync(path.join(dir,'Connected-Calculations.html'),html);
