const path = require("path");
const colors = require("colors");
const moment = require("moment");
const fs = require("fs");
const parseHTML = require("../lib/parseHTML");

function  index(){
    const inputDir = path.join(__dirname,"../html");
    const outputHTMLDir = path.join(__dirname,"../escapeHtml");
    const outputJSONDir = path.join(__dirname,"../JSON");
    fs.readdir(inputDir,(err,fileList)=>{
        if(!err){
            for(const fileName of fileList){
                console.log(colors.cyan(`[${moment().format("yyyy-mm-dd hh:mm:ss")}] 读取文件 【${path.join(inputDir,fileName)}】`));
                let content = fs.readFileSync(path.join(inputDir,fileName)).toString();
                console.log(colors.cyan(`[${moment().format("yyyy-mm-dd hh:mm:ss")}] 开始任务`));
                let parse = new parseHTML(content);
                const escapeHTML = parse.pretreat();
                let outputHTMLFile = path.join(outputHTMLDir,fileName);
                console.log(colors.cyan(`[${moment().format("yyyy-mm-dd hh:mm:ss")}] 写入转义后的文件 【${outputHTMLFile}】`));
                fs.writeFileSync(outputHTMLFile,escapeHTML);
                console.log(colors.cyan(`[${moment().format("yyyy-mm-dd hh:mm:ss")}] 获取文档节点信息 【${outputHTMLFile}】`));
                parse.getDoument();
            }
        }else{
            throw err;
        }
    })
}
index()



