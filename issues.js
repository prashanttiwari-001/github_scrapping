const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
function getIssuePageHtml(url,topic,repoName){
    request(url, cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
            // getReposLink(html);
            // console.log(html);
            getIssues(html);

        }
    }
    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline")
        let arr =[];
        for(let i=0; i<issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(topic,"   ",arr);
        let folderPath = path.join(__dirname, topic);
        dirCreater(folderPath);
        let filePath = path.join(folderPath, repoName + ".json");
        fs.writeFileSync(filePath,JSON.stringify(arr));
    }
} 
module.exports = getIssuePageHtml;
function dirCreater(folderPath){
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
        
    }
}

