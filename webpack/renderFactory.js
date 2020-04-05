module.exports=function(template){
  
  let Engine=require('xhtml-engine')(template.trim());
  // debugger

  console.log(Engine);

  return template;

};