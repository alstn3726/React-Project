"use strict";

var express = require("express");

var router = express.Router();

var multer = require('multer');

var path = require('path');

var fs = require('fs');

var cBook = require("../public/models/cBook");

var jBook = require("../public/models/jBook");

var kBook = require("../public/models/kBook");

var wBook = require("../public/models/wBook");

var session = require("./session");

router.use(session);
fs.readdir('uploads', function (error) {
  // uploads 폴더 없으면 생성
  if (error) {
    fs.mkdirSync('uploads');
  }
});
var upload = multer({
  //storage : 파일 저장 방식과 경로, 파일명 등 설정
  //diskStorage 사용해 이미지 서버 디스크에 저장
  //destination 메서드로 저장경로 uploads/ 폴더로 지정.
  //filename 은 기존 이름(file.originalname) + 업로드 날짜(Date.now()) 
  //+ 기존 확장자(path.extname)를 붙여 설정
  storage: multer.diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
      var ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}); // 중식 북
//북 메뉴 추가 페이지

router.post("/c", upload.single('file'), function (req, res, next) {
  console.log('file===>', req.file.filename);
  var menu = req.body.menu; // const filename =  '/uploads/'+req.file.filename

  var filename = req.file.filename;
  console.log('menu', menu);
  console.log('filename', filename); // const cBookImg = req.file.filename;

  var cBookModel = new cBook();
  cBookModel.cBookTitle = menu;
  cBookModel.cBookImg = filename;
  cBookModel.save().then(function (newCBook) {
    console.log("중식 북 생성");
    res.status(200).json({
      data: {
        cBook: newCBook
      }
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
}); /////일식
//북 메뉴 추가 페이지

router.post("/j", upload.single('file'), function (req, res, next) {
  // const { jBookTitle, jBookImg } = req.body;
  console.log("일식 추가 페이지");
  console.log('file===>', req.file.filename);
  var menu = req.body.menu; // const filename =  '/uploads/'+req.file.filename

  var filename = req.file.filename;
  console.log('menu', menu);
  console.log('filename', filename);
  var jBookModel = new jBook();
  jBookModel.jBookTitle = menu;
  jBookModel.jBookImg = filename;
  jBookModel.save().then(function (newJBook) {
    console.log("일식 북 생성");
    res.status(200).json({
      data: {
        jBook: newJBook
      }
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
}); /////한식
//북 메뉴 추가 페이지

router.post("/k", upload.single('file'), function (req, res, next) {
  console.log('한식메뉴 추가');
  console.log('file===>', req.file.filename);
  var menu = req.body.menu;
  var filename = req.file.filename;
  console.log('menu', menu);
  console.log('filename', filename);
  var kBookModel = new kBook();
  kBookModel.kBookTitle = menu;
  kBookModel.kBookImg = filename;
  kBookModel.save().then(function (newKBook) {
    console.log("한식 북 생성");
    res.status(200).json({
      data: {
        kBook: newKBook
      }
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
}); /////양식
//북 메뉴 추가 페이지

router.post("/w", upload.single('file'), function (req, res, next) {
  console.log('양식 메뉴 추가');
  console.log('file===>', req.file.filename);
  var menu = req.body.menu;
  var filename = req.file.filename;
  console.log('menu', menu);
  console.log('filename', filename);
  var wBookModel = new wBook();
  wBookModel.wBookTitle = menu;
  wBookModel.wBookImg = filename;
  wBookModel.save().then(function (newWBook) {
    console.log("양식 북 생성");
    res.status(200).json({
      data: {
        wBook: newWBook
      }
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
});
module.exports = router;