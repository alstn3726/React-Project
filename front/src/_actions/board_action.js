import axios from "axios";
import {
  FREEBOARD_LIST,
  FREEBOARD_WRITE,
  FREEBOARD_DETAIL,
  ADDBOARD_LIST,
  FREEBOARD_DELETE,
  FREEBOARD_UPDATE,
  FREEBOARDREPLY_READ
} from "./BoardTypes";

export function getFreeBoardList() {
  const request = axios.get("/freeBoard").then((res) => res.data.freeboard);
  console.log('boardActoin ==> ',request)
  return {
    type: FREEBOARD_LIST,
    payload: request,
  };
}

export function getUpdateBoardList(){
  const request = axios.get("/freeBoard").then((res) => res.data.freeboard);
  console.log('boardActoin ==> ',request)
  return {
    type: FREEBOARD_UPDATE,
    payload: request,
  };
}

export function getDeleteBoardList(){
  const request = axios.get("/freeBoard").then((res) => res.data.freeboard);
  console.log('boardActoin ==> ',request)
  return {
    type: FREEBOARD_DELETE,
    payload: request,
  };
}

export function postFreeBoardPost() {
  const request = axios.post("/freeBoard/write").then((res) => res.data);

  return {
    type: FREEBOARD_WRITE,
    payload: request,
  };
}

export function getFreeBoardDetail(fno) {
  console.log("action에 들어왔어요 수박");
  const request = axios.get(`/freeBoard/${fno}`).then((res) => res.data);
  console.log("request", request);
  return {
    type: FREEBOARD_WRITE,
    payload: request,
  };
}

// export function postFreeBoardPost() {
//   const request = axios.post("/freeBoard/write").then((res) => res.data);

//   return {
//     type:FREEBOARD_WRITE,
//     payload:request
//   }
// }

export function getAddBoardList() {
  console.log("addboardlist");
  const req = axios.get("/addBoard").then((res) => res.data);

  return{
    type:ADDBOARD_LIST,
    payload:req
  }
}


export function getReplyRead(fno){
  console.log('댓글 가져오기!!');

  const req = axios.get(`/freeBoard/reply/${fno}`).then(res=>res.data)

  return{
    type:FREEBOARDREPLY_READ,
    payload:req
  }

}