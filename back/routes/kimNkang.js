const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cBook = require("../public/models/cBook");
const jBook = require("../public/models/jBook");
const kBook = require("../public/models/kBook");
const wBook = require("../public/models/wBook");

const session = require("./session");

router.use(session);

fs.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('uploads');
    }
})
const upload = multer({
    //storage : 파일 저장 방식과 경로, 파일명 등 설정
    //diskStorage 사용해 이미지 서버 디스크에 저장
    //destination 메서드로 저장경로 uploads/ 폴더로 지정.
    //filename 은 기존 이름(file.originalname) + 업로드 날짜(Date.now()) 
    //+ 기존 확장자(path.extname)를 붙여 설정
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

// 중식 북

//북 메뉴 추가 페이지
router.post("/c", upload.single('file'), (req, res, next) => {
    console.log('file===>',req.file.filename);
    const { menu } = req.body;
    // const filename =  '/uploads/'+req.file.filename
    const filename =  req.file.filename
    console.log('menu',menu);
    console.log('filename',filename);
    // const cBookImg = req.file.filename;

    const cBookModel = new cBook();
  
    cBookModel.cBookTitle = menu;
    cBookModel.cBookImg = filename;
  
    cBookModel
    .save()
    .then((newCBook) => {
    console.log("중식 북 생성");
    res.status(200).json({
        data: {
        cBook: newCBook,
        },
    });
    })
    .catch((err) => {
    res.status(500).json({
        message: err,
    });
    });
});


/////일식
//북 메뉴 추가 페이지
  router.post("/j",  upload.single('file'), (req, res, next) => {
    // const { jBookTitle, jBookImg } = req.body;

    console.log("일식 추가 페이지")
    console.log('file===>',req.file.filename);
    const { menu } = req.body;
    // const filename =  '/uploads/'+req.file.filename
    const filename =  req.file.filename
    console.log('menu',menu);
    console.log('filename',filename);

    const jBookModel = new jBook();
 
    jBookModel.jBookTitle = menu;
    jBookModel.jBookImg = filename;
  
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



/////한식
//북 메뉴 추가 페이지
router.post("/k", upload.single('file'), (req, res, next) => {
    console.log('한식메뉴 추가')
    console.log('file===>',req.file.filename);
    const { menu } = req.body;
    const filename =  req.file.filename
    console.log('menu',menu);
    console.log('filename',filename);

    const kBookModel = new kBook();
 
    kBookModel.kBookTitle = menu;
    kBookModel.kBookImg = filename;
  
    kBookModel
    .save()
    .then((newKBook) => {
    console.log("한식 북 생성");
    res.status(200).json({
        data: {
        kBook: newKBook,
        },
    });
    })
    .catch((err) => {
    res.status(500).json({
        message: err,
    });
    });
});



/////양식
//북 메뉴 추가 페이지
router.post("/w", upload.single('file'), (req, res, next) => {
    console.log('양식 메뉴 추가')
    console.log('file===>',req.file.filename);
    const { menu } = req.body;
    const filename =  req.file.filename
    console.log('menu',menu);
    console.log('filename',filename);

    const wBookModel = new wBook();

    wBookModel.wBookTitle = menu;
    wBookModel.wBookImg = filename;

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


module.exports = router;