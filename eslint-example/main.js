 import {
     getUsefulContents
 } from "file";

 getUsefulContents("http://www.example.com", data => {
     doSomethingUseful(data);
 });