// scripts/generate_dom_json.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const pages = [
  {name:'index',file:path.resolve(__dirname,'..','dist','index.html')},
  {name:'solar-calculator',file:path.resolve(__dirname,'..','dist','solar-calculator.html')},
  {name:'privacy-policy',file:path.resolve(__dirname,'..','dist','privacy-policy.html')},
  {name:'terms',file:path.resolve(__dirname,'..','dist','terms.html')}
];
function serialize(node){
  if(node.nodeType===Node.ELEMENT_NODE){
    const obj={tag:node.tagName.toLowerCase()};
    const attrs={};
    for(const a of node.attributes){attrs[a.name]=a.value;}
    if(Object.keys(attrs).length)obj.attributes=attrs;
    const children=[];
    for(const c of node.childNodes){
      const child=serialize(c);
      if(child!==null)children.push(child);
    }
    if(children.length)obj.children=children;
    return obj;
  } else if(node.nodeType===Node.TEXT_NODE){
    const t=node.textContent.trim();
    return t?{text:t}:null;
  } else if(node.nodeType===Node.COMMENT_NODE){
    const c=node.textContent.trim();
    return c?{comment:c}:null;
  }
  return null;
}
(async()=>{
  const browser=await puppeteer.launch({headless:true});
  const result={};
  for(const p of pages){
    const page=await browser.newPage();
    await page.goto('file://'+p.file);
    await page.waitForTimeout(500);
    const dom=await page.evaluate(()=>{
      return serialize(document.body);
      function serialize(node){
        if(node.nodeType===Node.ELEMENT_NODE){
          const obj={tag:node.tagName.toLowerCase()};
          const attrs={};
          for(const a of node.attributes){attrs[a.name]=a.value;}
          if(Object.keys(attrs).length)obj.attributes=attrs;
          const children=[];
          for(const c of node.childNodes){
            const child=serialize(c);
            if(child!==null)children.push(child);
          }
          if(children.length)obj.children=children;
          return obj;
        } else if(node.nodeType===Node.TEXT_NODE){
          const t=node.textContent.trim();
          return t?{text:t}:null;
        } else if(node.nodeType===Node.COMMENT_NODE){
          const c=node.textContent.trim();
          return c?{comment:c}:null;
        }
        return null;
      }
    });
    result[p.name]=dom;
    await page.close();
  }
  await browser.close();
  const out=path.resolve(__dirname,'..','dom_panel.json');
  fs.writeFileSync(out,JSON.stringify(result,null,2),'utf-8');
  console.log('Written',out);
})();
