const request = require("request");
const cheerio = require("cheerio");
const url ="https://github.com/topics";
const getReposPageHtml = require("./reposPage");
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        getTopicLink(html);
    }
}
function getTopicLink(html){
    let $  = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0; i<linkElemArr.length; i++){
        let href =  $(linkElemArr[i]).attr("href");
        // console.log(href); 
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        // console.log(fullLink);
        getReposPageHtml(fullLink, topic);
    }


}