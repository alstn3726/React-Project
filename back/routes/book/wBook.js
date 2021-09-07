const express = require("express");
const router = express.Router();

const wBook = require("../../public/models/wBook");
const wBookReply = require("../../public/models/wBookReply");

const session = require("../session");

router.use(session);

// 양식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { wBookTitle, wBookImg } = req.body;
    console.log(req.body);
  
    const wBookModel = new wBook();
  
    wBookModel.wBookTitle = wBookTitle;
    wBookModel.wBookImg = wBookImg;
  
    wBookModel
      .save()
      .then((newWBook) => {
        console.log("양식 북 생성");
        res.status(200).json({
          data: {
            wBook: newWBook,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
  
  //북 메뉴 결정 페이지
  router.get('/', (req,res,next)=>{
    
    const wBookNo=req.body.wBookmNo
    console.log("wBookNo",wBookNo)
  
    wBook
      
      .aggregate([{$sample : {size : 1}}])
      .then((wBook)=>{
        if(wBook == "")
          return res.status(404).json({message:"Not Found wBook"});
          console.log("중식 북 결과창 보기");
            res.status(200).json({
              data: {
                wBook: wBook,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  //중식 북 댓글 get

  router.get('/:wBookmNo', (req,res,next)=>{
    const wBookmNo = req.params.wBookmNo;
    console.log('댓글 들어옴')
    console.log("wBookmNo",wBookmNo);
  
    wBookReply
      .find({wBookmNo:wBookmNo})
      .sort({wBookReNo:'-1'})
      .limit(5)
      .then((wBookReply)=>{
        if(wBookReply == "")
          return res.status(404).json({message:"Not Found wBookReply"});
          console.log("중식 북 댓글창 보기");
          console.log('댓글창 보기 wbookmno==>',wBookmNo);
            res.status(200).json({
              data: {
                wBookReply : wBookReply,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  
  //중식 북 댓글 write
  router.post("/wBookReply/write", (req, res, next) => {
  
    
    const { wBookReComment,wBookmNo } = req.body;
    const wBookReUserid = req.session.user_id;
    console.log('wBookNo',wBookmNo);
  
    const wBookReplyModel = new wBookReply();
    
    wBookReplyModel.wBookmNo = wBookmNo;
    wBookReplyModel.wBookReComment = wBookReComment;
    wBookReplyModel.wBookReUserid = wBookReUserid;
    console.log('wBookNo',wBookmNo);
    console.log("wBookReplyModel",wBookReplyModel)
    wBookReplyModel
      .save()
      .then((newwBookReply) => {
        console.log("중식 댓글 write");
        res.status(200).json({
          data: {
            wBookReply: newwBookReply,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
  
  module.exports = router;