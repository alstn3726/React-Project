const express = require("express");
const router = express.Router();

const jBook = require("../../public/models/jBook");
const jBookReply = require("../../public/models/jBookReply");

const session = require("../session");

router.use(session);


// 일식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { jBookTitle, jBookImg } = req.body;
    console.log(req.body);
  
    const jBookModel = new jBook();
  
    jBookModel.jBookTitle = jBookTitle;
    jBookModel.jBookImg = jBookImg;
  
    jBookModel
      .save()
      .then((newJBook) => {
        console.log("일식 북 생성");
        res.status(200).json({
          data: {
            jBook: newJBook,
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
    
    const jBookNo=req.body.jBookmNo
    console.log("jBookNo",jBookNo);
  
    jBook
      
      .aggregate([{$sample : {size : 1}}])
      .then((jBook)=>{
        if(jBook == "")
          return res.status(404).json({message:"Not Found jBook"});
          console.log("중식 북 결과창 보기");
            res.status(200).json({
              data: {
                jBook: jBook,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });

  //일식 북 댓글 get

  router.get('/:jBookmNo', (req,res,next)=>{
    const jBookmNo = req.params.jBookmNo;
    console.log('댓글 들어옴')
    console.log("jBookmNo",jBookmNo);
  
    jBookReply
      .find({jBookmNo:jBookmNo})
      .sort({jBookReNo:'-1'})
      .limit(5)
      .then((jBookReply)=>{
        if(jBookReply == "")
          return res.status(404).json({message:"Not Found jBookReply"});
          console.log("중식 북 댓글창 보기");
          console.log('댓글창 보기 jbookmno==>',jBookmNo);
            res.status(200).json({
              data: {
                jBookReply : jBookReply,
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
  router.post("/jBookReply/write", (req, res, next) => {
  
    
    const { jBookReComment,jBookmNo } = req.body;
    const jBookReUserid = req.session.user_id;
    console.log('jBookNo',jBookmNo);
  
    const jBookReplyModel = new jBookReply();
    
    jBookReplyModel.jBookmNo = jBookmNo;
    jBookReplyModel.jBookReComment = jBookReComment;
    jBookReplyModel.jBookReUserid = jBookReUserid;
    console.log('jBookNo',jBookmNo);
    console.log("jBookReplyModel",jBookReplyModel)
    jBookReplyModel
      .save()
      .then((newjBookReply) => {
        console.log("중식 댓글 write");
        res.status(200).json({
          data: {
            jBookReply: newjBookReply,
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