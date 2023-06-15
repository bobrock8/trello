import axios from "axios";

export default axios.create({
  params: {
    token:"",
    key:""
  },
  baseURL: "https://api.trello.com/1/"
})